const DB_NAME = "mynotes";
const DB_VERSION = 1;

const NOTES_STORE = "notes";
const TAGS_STORE = "tags";

// -----------------------------------------------------------------------------
// IndexedDB
// -----------------------------------------------------------------------------

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(NOTES_STORE)) {
        db.createObjectStore(NOTES_STORE);
      }

      if (!db.objectStoreNames.contains(TAGS_STORE)) {
        db.createObjectStore(TAGS_STORE);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function put(storeName, key, value) {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");

    tx.objectStore(storeName).put(value, key);

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

// async function put(storeName, key, value) {
//   const db = await openDB();

//   return new Promise((resolve, reject) => {
//     const tx = db.transaction(storeName, "readwrite");

//     tx.objectStore(storeName).put(value, key);

//     tx.oncomplete = () => resolve();

//     tx.onerror = () => reject(tx.error);
//   });
// }


// -----------------------------------------------------------------------------
// Encryption Helpers (Web Crypto API)
// -----------------------------------------------------------------------------

// Helper to derive a secure AES-GCM key from a plain text secret and salt
async function deriveKey(secret, salt) {
  const encoder = new TextEncoder();

  // 1. Import the raw secret string as a base key material
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  // 2. Derive a 256-bit AES-GCM key using PBKDF2
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000, // Standard high iteration count
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false, // Key is not extractable for security
    ["encrypt", "decrypt"]
  );
}

// Encrypts a string using a secret passphrase
async function encryptData(plainText, secret) {
  const encoder = new TextEncoder();

  // Generate random salt (16 bytes) and Initialization Vector (12 bytes)
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const key = await deriveKey(secret, salt);

  // Encrypt the string data
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    key,
    encoder.encode(plainText)
  );

  // Return everything needed for decryption as standard Arrays/Buffers
  return {
    ciphertext: new Uint8Array(ciphertext),
    salt: Array.from(salt),
    iv: Array.from(iv)
  };
}

// Decrypts the encrypted object back into a string
async function decryptData(encryptedObj, secret) {
  const decoder = new TextDecoder();

  const salt = new Uint8Array(encryptedObj.salt);
  const iv = new Uint8Array(encryptedObj.iv);
  const ciphertext = encryptedObj.ciphertext;

  const key = await deriveKey(secret, salt);

  // Decrypt back to raw bytes
  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: iv },
    key,
    ciphertext
  );

  return decoder.decode(decryptedBuffer);
}




// -----------------------------------------------------------------------------
// Core Storage Functions
// -----------------------------------------------------------------------------

/**
 * Encrypts and saves tag data to IndexedDB
 * @param {string} key - The look-up key for the tag (e.g., "tag_id_123")
 * @param {any} data - The data object/string to encrypt
 * @param {string} secret - The user's secret password/key
 */

export async function saveTag(key, data, secret) {
  const plainText = typeof data === "string" ? data : JSON.stringify(data);
  const encryptedPayload = await encryptData(plainText, secret);
  await put(TAGS_STORE, key, encryptedPayload);
}


// export function generateUUID() {
//   return crypto.randomUUID();
// }


// const mySecret = "super-secure-user-passphrase";

// // 1. Saving an object securely
// const sensitiveTag = { name: "Offshore Account", balance: 500000 };
// await saveTag("tag_01", sensitiveTag, mySecret);