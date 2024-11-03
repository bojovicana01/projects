from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import padding, hashes
from cryptography.hazmat.backends import default_backend
import os
import io
import zipfile

def zip_compress(content, filename_in_zip):
    allocated_mem = io.BytesIO()
    with zipfile.ZipFile(allocated_mem, 'w', zipfile.ZIP_DEFLATED) as zf:
        zf.writestr(filename_in_zip, content)
    allocated_mem.seek(0)

    bytes_zip = allocated_mem.getvalue()

    return bytes_zip

def zip_decompress(bytes_zip, filename_in_zip):
    allocated_mem = io.BytesIO(bytes_zip)
    with zipfile.ZipFile(allocated_mem, 'r') as zf:
        try:
            decompressed_content = zf.read(filename_in_zip)
        except KeyError:
            decompressed_content = None

    return decompressed_content

def triple_des_encrypt(plaintext, symetrical_key):
    symetrical_key = symetrical_key.ljust(24, b'\0')[:24]

    init_val = os.urandom(8)

    cipher_method = Cipher(algorithms.TripleDES(symetrical_key), modes.CBC(init_val), backend=default_backend())
    encryptor_cipher_method = cipher_method.encryptor()

    padder_object = padding.PKCS7(algorithms.TripleDES.block_size).padder()
    padded_plaintext = padder_object.update(plaintext) + padder_object.finalize()

    ciphertext = encryptor_cipher_method.update(padded_plaintext) + encryptor_cipher_method.finalize()

    ret_val = init_val + ciphertext

    return ret_val


def triple_des_decrypt(ciphertext, symetrical_key):
    symetrical_key = symetrical_key.ljust(24, b'\0')[:24]

    init_val = ciphertext[:8]
    raw_ciphertext = ciphertext[8:]

    cipher_method = Cipher(algorithms.TripleDES(symetrical_key), modes.CBC(init_val), backend=default_backend())
    decryptor_cipher_method = cipher_method.decryptor()

    padded_plaintext = decryptor_cipher_method.update(raw_ciphertext) + decryptor_cipher_method.finalize()

    unpadder_object = padding.PKCS7(algorithms.TripleDES.block_size).unpadder()
    plaintext = unpadder_object.update(padded_plaintext) + unpadder_object.finalize()

    return plaintext

def aes128_encrypt(plaintext, symetrical_key):

    init_val = os.urandom(16)

    cipher_method = Cipher(algorithms.AES128(symetrical_key), modes.CBC(init_val), backend=default_backend())
    encryptor_cipher_method = cipher_method.encryptor()

    padder_object = padding.PKCS7(algorithms.AES128.block_size).padder()
    padded_plaintext = padder_object.update(plaintext) + padder_object.finalize()

    ciphertext = encryptor_cipher_method.update(padded_plaintext) + encryptor_cipher_method.finalize()

    ret_val = init_val + ciphertext

    return ret_val


def aes128_decrypt(ciphertext, symetrical_key):

    init_val = ciphertext[:16]
    raw_ciphertext = ciphertext[16:]

    cipher_method = Cipher(algorithms.AES128(symetrical_key), modes.CBC(init_val), backend=default_backend())
    decryptor_cipher_method = cipher_method.decryptor()

    padded_plaintext = decryptor_cipher_method.update(raw_ciphertext) + decryptor_cipher_method.finalize()

    unpadder_object = padding.PKCS7(algorithms.AES128.block_size).unpadder()
    plaintext = unpadder_object.update(padded_plaintext) + unpadder_object.finalize()

    return plaintext