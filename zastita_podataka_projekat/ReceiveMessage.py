import base64
import os

from PyQt5 import QtCore, QtGui, QtWidgets
from PyQt5.QtWidgets import QButtonGroup
from cryptography.exceptions import InvalidSignature
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.backends import default_backend

from cryptography.hazmat.primitives.asymmetric import rsa, padding

from main import triple_des_encrypt, aes128_decrypt, zip_decompress, triple_des_decrypt


class Ui_receive_message_window(object):
    temp_key_id_for_PRb = 0
    temp_key_id_for_PUa = 0

    temp_PRb = 0
    ime_datoteke=''
    def setupUi(self, receive_message_window):
        self.Ui_receive_message_window = receive_message_window

        # GENERALNA PODESAVANJA PROZORA
        self.receive_message_window = receive_message_window
        receive_message_window.setObjectName("receive_message_window")
        receive_message_window.resize(819, 431)
        self.centralwidget = QtWidgets.QWidget(receive_message_window)
        self.centralwidget.setObjectName("centralwidget")
        self.received_message_label = QtWidgets.QLabel(self.centralwidget)
        self.received_message_label.setGeometry(QtCore.QRect(20, 20, 151, 21))
        self.received_message_label.setObjectName("received_message_label")
        self.text_field_received_msg = QtWidgets.QTextEdit(self.centralwidget)
        self.text_field_received_msg.setGeometry(QtCore.QRect(20, 50, 601, 141))
        self.text_field_received_msg.setObjectName("received_message_text")

        # self.PUa_choice_window_btn = QtWidgets.QPushButton(self.centralwidget)
        # self.PUa_choice_window_btn.setGeometry(QtCore.QRect(20, 220, 241, 28))
        # self.PUa_choice_window_btn.setObjectName("PUa_choice_window_btn")
        self.PRb_choice_window_btn = QtWidgets.QPushButton(self.centralwidget)
        self.PRb_choice_window_btn.setGeometry(QtCore.QRect(20, 220, 241, 28))
        self.PRb_choice_window_btn.setObjectName("PRb_choice_window_btn")

        self.receive_btn = QtWidgets.QPushButton(self.centralwidget)
        self.receive_btn.setGeometry(QtCore.QRect(440, 300, 171, 41))
        self.receive_btn.setObjectName("receive_btn")
        self.label = QtWidgets.QLabel(self.centralwidget)
        self.label.setGeometry(QtCore.QRect(30, 310, 181, 16))
        self.label.setObjectName("label")

        # LABELA ZA IME DATOTEKE
        self.labela_ime_datoteka = QtWidgets.QLabel(self.centralwidget)
        self.labela_ime_datoteka.setGeometry(QtCore.QRect(480, 210, 95, 20))
        font = QtGui.QFont()
        font.setPointSize(10)
        self.labela_ime_datoteka.setFont(font)
        self.labela_ime_datoteka.setObjectName("labela_ime_datoteka")

        # TEXTEDIT ZA IME DATOTEKE
        self.text_ime_datoteke = QtWidgets.QTextEdit(self.centralwidget)
        self.text_ime_datoteke.setGeometry(QtCore.QRect(480, 230, 100, 30))
        self.text_ime_datoteke.setObjectName("text_ime_datoteke")

        # LABELA ZA IME AUTORA
        self.labela_ime_autora = QtWidgets.QLabel(self.centralwidget)
        self.labela_ime_autora.setGeometry(QtCore.QRect(670, 210, 95, 20))
        font = QtGui.QFont()
        font.setPointSize(10)
        self.labela_ime_autora.setFont(font)
        self.labela_ime_autora.setObjectName("labela_ime_autora")

        # TEXTEDIT ZA IME AUTORA
        self.text_ime_autora = QtWidgets.QTextEdit(self.centralwidget)
        self.text_ime_autora.setGeometry(QtCore.QRect(670, 230, 100, 30))
        self.text_ime_autora.setObjectName("text_ime_autora")


        #ALG1 RADIO BTN
        self.triple_des_radio_btn = QtWidgets.QRadioButton(self.centralwidget)
        self.triple_des_radio_btn.setGeometry(QtCore.QRect(220, 310, 95, 20))
        self.triple_des_radio_btn.setObjectName("triple_des_radio_btn")

        #ALG2 RADIO BTN
        self.aes128_radio_btn = QtWidgets.QRadioButton(self.centralwidget)
        self.aes128_radio_btn.setGeometry(QtCore.QRect(220, 340, 95, 20))
        self.aes128_radio_btn.setObjectName("aes128_radio_btn")

        #DODATNA PODESAVANJA ZA RADIO DUGMADI
        self.rb_group = QButtonGroup()
        self.rb_group.addButton(self.triple_des_radio_btn, 1)
        self.rb_group.addButton(self.aes128_radio_btn, 2)



        receive_message_window.setCentralWidget(self.centralwidget)
        self.menubar = QtWidgets.QMenuBar(receive_message_window)
        self.menubar.setGeometry(QtCore.QRect(0, 0, 819, 26))
        self.menubar.setObjectName("menubar")
        receive_message_window.setMenuBar(self.menubar)
        self.statusbar = QtWidgets.QStatusBar(receive_message_window)
        self.statusbar.setObjectName("statusbar")
        receive_message_window.setStatusBar(self.statusbar)

        # povezivanje dugmica
        self.receive_btn.clicked.connect(self.receive_msg)
        # self.PUa_choice_window_btn.clicked.connect(self.choose_PUa)
        self.PRb_choice_window_btn.clicked.connect(self.choose_PRb)

        self.retranslateUi(receive_message_window)
        QtCore.QMetaObject.connectSlotsByName(receive_message_window)

    def retranslateUi(self, receive_message_window):
        _translate = QtCore.QCoreApplication.translate
        receive_message_window.setWindowTitle(_translate("receive_message_window", "ReceiveMessage"))
        self.received_message_label.setText(_translate("receive_message_window", "Received message:"))
        # self.PUa_choice_window_btn.setText(_translate("receive_message_window", "Choose PUa for Digital Signature"))
        self.PRb_choice_window_btn.setText(_translate("receive_message_window", "Choose PRb for Message Encryption"))
        self.receive_btn.setText(_translate("receive_message_window", "RECEIVE"))
        self.label.setText(_translate("receive_message_window", "Choose Symetrical Algorithm:"))
        self.triple_des_radio_btn.setText(_translate("receive_message_window", "TRIPLE DES"))
        self.aes128_radio_btn.setText(_translate("receive_message_window", "AES128"))
        self.labela_ime_datoteka.setText(_translate("send_message_window", "Unesite ime datoteke: "))
        self.labela_ime_datoteka.adjustSize()
        self.labela_ime_autora.setText(_translate("send_message_window", "Ime autora: "))
        self.labela_ime_autora.adjustSize()

    # Biranje PUa kojim se desifruje potpis
    def choose_PRb(self):
        self.ime_datoteke = self.text_ime_datoteke.toPlainText()
        if(self.ime_datoteke==''):
            self.show_popup(1)
            return
        file_path = os.path.join("message_directory/", self.ime_datoteke + ".txt")
        if os.path.exists(file_path) and os.path.isfile(file_path):
            print("Fajl postoji.")
        else:
            print("Fajl ne postoji")
            self.show_popup(2)
            return

        # BASE64
        with open(file_path, "r") as file:
            line = file.readline()

        # ID PUb, ENKRIPTOVAN KS I ENKRIPTOVANA PORUKA
        confidentiality_output = base64.b64decode(line.strip().encode('utf-8'))

        # PODELA NA ZELJENE DELOVE
        temp_key_id_for_PUb_bytes = confidentiality_output[:8]

        self.temp_key_id_for_Pub = int.from_bytes(temp_key_id_for_PUb_bytes, byteorder='big')
        print("temp_key_id_for_Pub ", self.temp_key_id_for_Pub)

        from retrievePRFromKeyID import Ui_retrievePR
        self.retPRwin = QtWidgets.QMainWindow()
        self.ui = Ui_retrievePR()
        self.ui.setupUi(self.retPRwin, self.temp_key_id_for_Pub,parent=self.receive_message_window)
        self.retPRwin.show()

    """
        def choose_PRb(self):
        from PRaChoice import Ui_PRa_choice_window
        self.PRa_choice_window = QtWidgets.QMainWindow()
        self.ui = Ui_PRa_choice_window()
        self.ui.setupUi(self.PRa_choice_window)
        self.PRa_choice_window.show()
    """

    # Biranje PRb kojim se desifruje KS
    def choose_PUa(self):
        from PUbChoice import Ui_PUb_choice_window
        self.PUb_choice_window = QtWidgets.QMainWindow()
        self.ui = Ui_PUb_choice_window()
        self.ui.setupUi(self.PUb_choice_window,parent = self.receive_message_window)
        self.PUb_choice_window.show()

    def receive_msg(self):
        #Provera da li su uenti svi parametri:

        # CITANJE IZ FAJLA
        self.ime_datoteke = self.text_ime_datoteke.toPlainText()
        if(self.ime_datoteke==''):
            self.show_popup(1)
            return
        file_path = os.path.join("message_directory/", self.ime_datoteke + ".txt")
        if os.path.exists(file_path) and os.path.isfile(file_path):
            print("Fajl postoji.")
        else:
            print("Fajl ne psotoji")
            self.show_popup(2)
            return

        file_path_services_used = os.path.join("message_directory/", self.ime_datoteke + "_services_used.txt")
        # SETTING FLAGS FOR USED SERVICES
        with open(file_path_services_used, "r") as fileSU:
            line_services_used = fileSU.readline()
            line_services_used_arr = line_services_used.split(' ')

        authenticationUsed = line_services_used_arr[0]
        compressionUsed = line_services_used_arr[1]
        encryptionUsed = line_services_used_arr[2]
        radix64Used = line_services_used_arr[3]

        if(
            self.ime_datoteke=='' or
                (
                        (self.temp_key_id_for_PRb==0 or self.temp_PRb==0)
                    and (encryptionUsed == "1")
                )
            or (self.rb_group.checkedId()!=1 and self.rb_group.checkedId()!=2)
        ):
            self.show_popup()
            return

        # BASE64
        with open(file_path,"r")as file:
            line = file.readline()

        # ID PUb, ENKRIPTOVAN KS I ENKRIPTOVANA PORUKA

        confidentiality_output = base64.b64decode(line.strip().encode('utf-8'))



        # PODELA NA ZELJENE DELOVE
        if (encryptionUsed == "1"):
            temp_key_id_for_PUb_bytes = confidentiality_output[:8]

            self.temp_key_id_for_Pub = int.from_bytes(temp_key_id_for_PUb_bytes, byteorder='big')
            print("temp_key_id_for_Pub ", self.temp_key_id_for_Pub)

            if (self.temp_key_id_for_PRb != 0 and self.temp_key_id_for_PRb != self.temp_key_id_for_Pub):
                self.show_popup(3)
                return

            # PRONADJI PRb
            reciever_PR = self.temp_PRb
            print("reciever_PR: " + str(reciever_PR))

            reciever_PR_rsa = serialization.load_pem_private_key(
                data=reciever_PR,
                password=None,
                backend=default_backend()
            )

            # ******* PODELA confidentiality_output U ZAVISNOSTI OD VELICINE PRb *********

            # TRAZIMO DUZINU PRa U BAJTOVIMA DA ZNAMO KOLIKO DA SLICUJEMO
            key_size_bits = reciever_PR_rsa.key_size

            # Pretvaranje dužine ključa u bajtove
            key_size_bytes = key_size_bits // 8

            if (key_size_bytes == 128):
                KS_ecrypted_bytes = confidentiality_output[8:136]
                encrypted_message = confidentiality_output[136:]
            elif (key_size_bytes == 256):
                KS_ecrypted_bytes = confidentiality_output[8:264]
                encrypted_message = confidentiality_output[264:]

            # Ispisivanje rezultata
            print("temp_key_id_for_PUb_bytes:", temp_key_id_for_PUb_bytes)
            print("KS_ecrypted_bytes:", KS_ecrypted_bytes)
            print("encrypted_message:", encrypted_message)

            # **** DEKRIPCIJA one_time_Ks_bytes *******
            one_time_Ks_bytes = reciever_PR_rsa.decrypt(
                KS_ecrypted_bytes,
                padding.OAEP(
                    mgf=padding.MGF1(algorithm=hashes.SHA256()),
                    algorithm=hashes.SHA256(),
                    label=None
                )
            )

            print("One time KS bytes: ", str(one_time_Ks_bytes))

            # DEKRIPTOVANJE PORUKE POMOCU Ks
            print(len(one_time_Ks_bytes))
            print("Algorith used: ")

            if (self.rb_group.checkedId() == 1):
                print("-----------> TRIPLE DES")
                compression_output = triple_des_decrypt(encrypted_message, one_time_Ks_bytes)
                print("Compression output:", str(compression_output))
            elif (self.rb_group.checkedId() == 2):
                print("-----------> AES 128")
                compression_output = aes128_decrypt(encrypted_message, one_time_Ks_bytes)
                print("Compression output:", str(compression_output))

        else:
            compression_output = confidentiality_output


        if (compressionUsed == "1"):
            authentication_outpt = zip_decompress(compression_output, "msg_to_compress")
            print("Auth output: ", str(authentication_outpt))
        else:
            authentication_outpt = compression_output


        if (authenticationUsed == "1"):

            '''
                authentication_outpt = temp_key_id_bytes + msg_signature + message_bytes [B]
                RADIMO SLICING
            '''
            temp_key_id_for_PUa_bytes = authentication_outpt[:8]

            # PRETVARANJE INDEKSA U INT
            temp_key_id_for_PUa = int.from_bytes(temp_key_id_for_PUa_bytes, byteorder='big')
            print("temp_key_id_for_PUa ", temp_key_id_for_PUa)
            self.temp_key_id_for_PUa = temp_key_id_for_PUa

            # TRAZENJE KLJUCA PUa
            private_keys_directory = "private_keys"
            files = os.listdir(private_keys_directory)
            files_txt = [f for f in files if
                         (os.path.isfile(os.path.join(private_keys_directory, f)) and f.endswith('.txt'))]

            for file in files_txt:
                filepath = "private_keys/" + file
                with open(filepath, 'r') as f:
                    for line in f:
                        line_arr = line.split(' admin ')
                        if (str(self.temp_key_id_for_PUa) == line_arr[0]):
                            str_pem_pu_key = line_arr[1]
                            sender_PU = base64.b64decode(str_pem_pu_key)
                            break

            for file in files_txt:
                filepath = "public_keys/" + file
                with open(filepath, 'r') as f:
                    for line in f:
                        line_arr = line.split(' ')
                        if (str(self.temp_key_id_for_PUa) == line_arr[4]):
                            self.ime_autora = line_arr[0]
                            break

            print("Ime autora: ",self.ime_autora)
            self.text_ime_autora.setText(self.ime_autora)
            print("sender_PU: " + str(sender_PU))

            sender_PU_rsa = serialization.load_pem_public_key(
                data=sender_PU,
                backend=default_backend()
            )

            # TRAZIMO DUZINU PRa U BAJTOVIMA DA ZNAMO KOLIKO DA SLICUJEMO
            key_size_bits = sender_PU_rsa.key_size

            # Pretvaranje dužine ključa u bajtove
            key_size_bytes = key_size_bits // 8

            if(key_size_bytes==128):
                msg_signature = authentication_outpt[8:136]
                message_bytes = authentication_outpt[136:]
            elif(key_size_bytes==256):
                msg_signature = authentication_outpt[8:264]
                message_bytes = authentication_outpt[264:]

            # ispis rezultata
            print("temp_key_id_for_PUa_bytes: ",str(temp_key_id_for_PUa_bytes))
            print("Msg_signature: ",str(msg_signature))
            print("Message_bytes: ",str(message_bytes))



            # *************** VERIFIKACIJA  ************

            # HESIRANJE PORUKE POMOCU SHA-1
            hash_method = hashes.Hash(hashes.SHA1(), backend=default_backend())
            # message_bytes = message.encode('utf-8')
            hash_method.update(message_bytes)
            message_bytes_hash = hash_method.finalize()
            message_bytes_hash_hex = message_bytes_hash.hex()

            print("Message bytes hash: ", str(message_bytes_hash))
            print("HESIRANA PORUKA: " + message_bytes_hash_hex)

            # ********* VERIFIKOVANJE POTPISA ***********
            try:
                sender_PU_rsa.verify(
                    msg_signature,
                    message_bytes_hash,
                    padding.PSS(
                        mgf=padding.MGF1(hashes.SHA256()),
                        salt_length=padding.PSS.MAX_LENGTH
                    ),
                    hashes.SHA256()
                )
                print("Potpis je validan.")
            except InvalidSignature:
                print("Potpis nije validan.")

            # DEKODOVANJE PORUKE IZ BYTES -> STRING
            message = message_bytes.decode('utf-8')
            print("Message: ",message)
            self.text_field_received_msg.setText(message)

        else:
            # DEKODOVANJE PORUKE IZ BYTES -> STRING
            message = authentication_outpt.decode('utf-8')
            print("Message: ", message)
            self.text_field_received_msg.setText(message)

        # RESETOVANJE KLJUCEVA I ID KLJUCEVA
        from SendMessage import Ui_send_message_window

        # RECEIVE MESSAGE
        # self.temp_key_id_for_PRb = 0
        # self.temp_key_id_for_PUa = 0
        # self.temp_PRb=0

        # SEND MESSAGE
        Ui_send_message_window.temp_key_id_for_PRa = 0
        Ui_send_message_window.temp_key_id_for_PUb = 0
        Ui_send_message_window.temp_PRa = 0



    def show_popup(self,flag=0):
        msg = QtWidgets.QMessageBox()
        msg.setWindowTitle("Incomplete form")
        if(flag==1):
            msg.setText("You haven't chosen a file")
        elif(flag==2):
            msg.setText("You have chosen unexsisted file")
        elif (flag == 3):
            msg.setText("Chosen private key is not compatible")
        else:
            msg.setText("You haven't filled all fields correctly.")

        msg.setIcon(QtWidgets.QMessageBox.Warning)
        msg.setStandardButtons(QtWidgets.QMessageBox.Cancel)
        msg.setInformativeText("Please, fill all fields!")

        msg.buttonClicked.connect(self.popup_button)
        x = msg.exec_()

    def popup_button(self, i):
        # da bismo videli da je dugme pritisnuto:
        print(i.text())


if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    receive_message_window = QtWidgets.QMainWindow()
    ui = Ui_receive_message_window()
    ui.setupUi(receive_message_window)
    receive_message_window.show()
    sys.exit(app.exec_())
