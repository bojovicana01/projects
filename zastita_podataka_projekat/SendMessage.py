from PyQt5 import QtCore, QtGui, QtWidgets
from PyQt5.QtWidgets import QButtonGroup

from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.backends import default_backend

from cryptography.hazmat.primitives.asymmetric import rsa, padding

from main import triple_des_encrypt, aes128_encrypt, zip_compress

import secrets
import os
import base64


class Ui_send_message_window(object):

    temp_key_id_for_PRa = 0
    temp_key_id_for_PUb = 0

    temp_PRa = 0

    def setupUi(self, send_message_window,parent=None):
        self.Ui_send_message_window = send_message_window
        self.parent = parent

        # GENERALNA PODESAVANJA PROZORA
        send_message_window.setObjectName("send_message_window")
        send_message_window.resize(800, 600)
        self.centralwidget = QtWidgets.QWidget(send_message_window)
        self.centralwidget.setObjectName("centralwidget")

        # CHECKBOX-OVI ZA ODABIR SERVISA KOJI SE KORISTE
        self.checkBoxEnkripcija = QtWidgets.QCheckBox(self.centralwidget)
        self.checkBoxEnkripcija.setGeometry(QtCore.QRect(40, 480, 91, 20))
        self.checkBoxEnkripcija.setObjectName("checkBoxEnkripcija")

        self.checkBoxPotpis = QtWidgets.QCheckBox(self.centralwidget)
        self.checkBoxPotpis.setGeometry(QtCore.QRect(150, 480, 81, 20))
        self.checkBoxPotpis.setObjectName("checkBoxPotpis")

        self.checkBoxKompresija = QtWidgets.QCheckBox(self.centralwidget)
        self.checkBoxKompresija.setGeometry(QtCore.QRect(240, 480, 101, 20))
        self.checkBoxKompresija.setObjectName("checkBoxKompresija")

        self.checkBoxRadix64 = QtWidgets.QCheckBox(self.centralwidget)
        self.checkBoxRadix64.setGeometry(QtCore.QRect(350, 480, 81, 20))
        self.checkBoxRadix64.setObjectName("checkBoxRadix64")

        # LABELA ZA UPIS TEKSTA PORUKE
        self.enter_text_msg_label = QtWidgets.QLabel(self.centralwidget)
        self.enter_text_msg_label.setGeometry(QtCore.QRect(30, 20, 181, 16))
        self.enter_text_msg_label.setObjectName("enter_text_msg_label")

        # POLJE ZA UPIS TEKSTA PORUKE
        self.text_msg_contents = QtWidgets.QTextEdit(self.centralwidget)
        self.text_msg_contents.setGeometry(QtCore.QRect(30, 50, 741, 87))
        self.text_msg_contents.setObjectName("text_msg_contents")

        # DUGME ZA IZBOR PRa
        self.PRa_choice_window_btn = QtWidgets.QPushButton(self.centralwidget)
        self.PRa_choice_window_btn.setGeometry(QtCore.QRect(30, 170, 241, 28))
        self.PRa_choice_window_btn.setObjectName("PRa_choice_window_btn")

        # DUGME ZA IZBOR PUb
        self.PUb_choice_window_btn = QtWidgets.QPushButton(self.centralwidget)
        self.PUb_choice_window_btn.setGeometry(QtCore.QRect(30, 210, 241, 28))
        self.PUb_choice_window_btn.setObjectName("PUb_choice_window_btn")

        # LABELA ZA IZBORA ALGORITMA ZA SIMETRICNU ENKRIPCIJU PORUKE
        self.choose_sym_alg_label = QtWidgets.QLabel(self.centralwidget)
        self.choose_sym_alg_label.setGeometry(QtCore.QRect(30, 260, 241, 16))
        self.choose_sym_alg_label.setObjectName("choose_sym_alg_label")

        # ALG1 RADIO BTN
        self.triple_des_radio_btn = QtWidgets.QRadioButton(self.centralwidget)
        self.triple_des_radio_btn.setGeometry(QtCore.QRect(240, 260, 95, 20))
        self.triple_des_radio_btn.setObjectName("triple_des_radio_btn")

        # ALG2 RADIO BTN
        self.aes128_radio_btn = QtWidgets.QRadioButton(self.centralwidget)
        self.aes128_radio_btn.setGeometry(QtCore.QRect(240, 290, 95, 20))
        self.aes128_radio_btn.setObjectName("aes128_radio_btn")

        # DODATNA PODESAVANJA RADIO DUGMADI
        self.rb_group = QButtonGroup()
        self.rb_group.addButton(self.triple_des_radio_btn, 1)
        self.rb_group.addButton(self.aes128_radio_btn, 2)

        # SUBMIT DUGME ZA SLANJE PORUKE
        self.finish_sending_btn = QtWidgets.QPushButton(self.centralwidget)
        self.finish_sending_btn.setGeometry(QtCore.QRect(440, 310, 201, 41))
        self.finish_sending_btn.setObjectName("finish_sending_btn")

        # LABELA ZA IME DATOTEKE
        self.labela_ime_datoteka = QtWidgets.QLabel(self.centralwidget)
        self.labela_ime_datoteka.setGeometry(QtCore.QRect(440, 180, 95, 20))
        font = QtGui.QFont()
        font.setPointSize(10)
        self.labela_ime_datoteka.setFont(font)
        self.labela_ime_datoteka.setObjectName("labela_ime_datoteka")


        # TEXTEDIT ZA IME DATOTEKE
        self.text_ime_datoteke = QtWidgets.QTextEdit(self.centralwidget)
        self.text_ime_datoteke.setGeometry(QtCore.QRect(440, 200, 100, 30))
        self.text_ime_datoteke.setObjectName("text_ime_datoteke")

        # DODATNA PODESAVANJA PROZORA
        send_message_window.setCentralWidget(self.centralwidget)
        self.menubar = QtWidgets.QMenuBar(send_message_window)
        self.menubar.setGeometry(QtCore.QRect(0, 0, 800, 26))
        self.menubar.setObjectName("menubar")
        send_message_window.setMenuBar(self.menubar)
        self.statusbar = QtWidgets.QStatusBar(send_message_window)
        self.statusbar.setObjectName("statusbar")
        send_message_window.setStatusBar(self.statusbar)

        self.retranslateUi(send_message_window)
        QtCore.QMetaObject.connectSlotsByName(send_message_window)

        # --> PODESAVANJE FUNKCIONALNOSTI
        self.PRa_choice_window_btn.clicked.connect(self.choose_PRa)
        self.PUb_choice_window_btn.clicked.connect(self.choose_PUb)

        self.finish_sending_btn.clicked.connect(self.submit_send)

    # PRELAZAK NA STRANICU ZA IZBOR PRa
    def choose_PRa(self):
        from PRaChoice import Ui_PRa_choice_window
        self.PRa_choice_window = QtWidgets.QMainWindow()
        self.ui = Ui_PRa_choice_window()
        self.ui.setupUi(self.PRa_choice_window)
        self.PRa_choice_window.show()

    # PRELAZAK NA STRANICU ZA IZBOR PUb
    def choose_PUb(self):
        from PUbChoice import Ui_PUb_choice_window
        self.PUb_choice_window = QtWidgets.QMainWindow()
        self.ui = Ui_PUb_choice_window()
        self.ui.setupUi(self.PUb_choice_window,parent=self.Ui_send_message_window)
        self.PUb_choice_window.show()

    def submit_send(self):
        message = self.text_msg_contents.toPlainText()

        # AKO NISU UNETA SVA POLJA
        if (
                self.text_ime_datoteke.toPlainText()=='' or
                self.temp_key_id_for_PRa == 0 or self.temp_key_id_for_PUb == 0
                or message == ""
                or (self.rb_group.checkedId() != 1 and self.rb_group.checkedId() != 2)
                or self.temp_PRa == 0
        ):

            self.show_popup()
            return

        sender_PR_key_id = self.temp_key_id_for_PRa
        reciever_PU_key_id = self.temp_key_id_for_PUb
        message_bytes = message.encode('utf-8')

        sender_PR = self.temp_PRa
        print("sender_PR: " + str(sender_PR))
        reciever_PU = -1

        private_keys_directory = "private_keys"
        files = os.listdir(private_keys_directory)
        files_txt = [f for f in files if (os.path.isfile(os.path.join(private_keys_directory, f)) and f.endswith('.txt'))]

        for file in files_txt:
            filepath = "private_keys/" + file
            with open(filepath, 'r') as f:
                for line in f:
                    line_arr = line.split(' admin ')
                    if (str(reciever_PU_key_id) == line_arr[0]):
                        str_pem_pu_key = line_arr[1]
                        reciever_PU = base64.b64decode(str_pem_pu_key)
                        break

        print("reciever_PU: " + str(reciever_PU))

        sender_PR_rsa = serialization.load_pem_private_key(
            data=sender_PR,
            password=None,
            backend=default_backend()
        )

        reciever_PU_rsa = serialization.load_pem_public_key(
            data=reciever_PU,
            backend=default_backend()
        )


        # *** AUTENTIKACIJA ****

        if (self.checkBoxPotpis.isChecked() == True):
            # HESIRANJE PORUKE POMOCU SHA-1
            hash_method = hashes.Hash(hashes.SHA1(), backend=default_backend())
            message_bytes = message.encode('utf-8')
            hash_method.update(message_bytes)
            message_bytes_hash = hash_method.finalize()
            message_bytes_hash_hex = message_bytes_hash.hex()

            print("Message bytes hash: ", str(message_bytes_hash))
            print("HESIRANA PORUKA: " + message_bytes_hash_hex)

            # ENKRIPTOVANJE HESIRANE PORUKE RSA ALG POMOCU sender_PR_rsa
            msg_signature = sender_PR_rsa.sign(
                message_bytes_hash,
                padding.PSS(
                    mgf=padding.MGF1(hashes.SHA256()),
                    salt_length=padding.PSS.MAX_LENGTH
                ),
                hashes.SHA256()
            )

            print("ENKRIPTOVANA HESIRANA PORUKA RSA ALGORITMOM POMOCU PRa: " + str(msg_signature))

            # **************************************************************************************************************

            # KONKATENIRA SE POTIPISANI HASH I ORIGINALNA PORUKA I temp_key_id_for_PRa
            temp_key_id_bytes = self.temp_key_id_for_PRa.to_bytes((self.temp_key_id_for_PRa.bit_length() + 7) // 8,
                                                                  byteorder='big')
            authentication_outpt = temp_key_id_bytes + msg_signature + message_bytes
            print("Messages bytes: " + str(len(message_bytes)))
            print("Msg_signature: " + str(len(msg_signature)))
            print("Key id PRa: " + str(len(temp_key_id_bytes)))
            print("Authentication_output: " + str(len(authentication_outpt)))
            print("Authentication_output: " + str(authentication_outpt))

        else:
            authentication_outpt = message_bytes



        # *** KOMPRESIJA ****
        if (self.checkBoxKompresija.isChecked() == True):
            compression_output = zip_compress(authentication_outpt, "msg_to_compress")
            print("Compressio Output: ", str(compression_output))
        else:
            compression_output = authentication_outpt

        # *** TAJNOST ****

        if (self.checkBoxEnkripcija.isChecked() == True):
            # GENERISANJE ONE-TIME Ks
            one_time_Ks = secrets.randbits(128)

            length_in_bytes = (one_time_Ks.bit_length() + 7) // 8
            one_time_Ks_bytes = one_time_Ks.to_bytes(length=length_in_bytes, byteorder='big')

            # ENKRIPTOVANJE PORUKE POMOCU Ks
            if (self.rb_group.checkedId() == 1):
                encrypted_message = triple_des_encrypt(compression_output, one_time_Ks_bytes)
                print("encrypted_message: " + str(encrypted_message))
            elif (self.rb_group.checkedId() == 2):
                encrypted_message = aes128_encrypt(compression_output, one_time_Ks_bytes)
                print("encrypted_message: " + str(encrypted_message))

            # ENKRIPTOVANJE Ks RSA ALG POMOCU reciever_PU_rsa
            KS_ecrypted_bytes = reciever_PU_rsa.encrypt(
                one_time_Ks_bytes,
                padding.OAEP(
                    mgf=padding.MGF1(algorithm=hashes.SHA256()),
                    algorithm=hashes.SHA256(),
                    label=None
                )
            )
            print("KS_ecrypted_bytes: " + str(KS_ecrypted_bytes))

            temp_key_id_for_PUb_bytes = self.temp_key_id_for_PUb.to_bytes(
                (self.temp_key_id_for_PUb.bit_length() + 7) // 8,
                byteorder='big')
            confidentiality_output = temp_key_id_for_PUb_bytes + KS_ecrypted_bytes + encrypted_message
            print("confidentiality_output: " + str(confidentiality_output))

        else:
            confidentiality_output = compression_output

        # *** BASE64 ****

        if (self.checkBoxRadix64.isChecked() == True):
            base64_output = base64.b64encode(confidentiality_output).decode('utf-8')
            print("base64_output: " + str(base64_output))
        else:
            base64_output = confidentiality_output

        # UPIS u FAJL
        ime_datoteke = self.text_ime_datoteke.toPlainText()

        # DIREKETORIJUM ZA PORUKE
        if not os.path.exists("message_directory"):
            os.makedirs("message_directory")

        file_path = os.path.join("message_directory/", ime_datoteke + ".txt")
        # upis poruke u datoteku
        # ako je poruka u bajtovima(samo enkripcija ili samo potpis) potrebna je konverzija
        if isinstance(base64_output, str):
            with open(file_path, "w") as f:
                f.write(base64_output)
                f.write("\n")
        else:
            with open(file_path, "w") as f:
                f.write(base64.b64encode(base64_output).decode('utf-8'))
            f.close()

        file_path_services_used = os.path.join("message_directory/", ime_datoteke + "_services_used.txt")
        # upis flagova u datoteku
        with open(file_path_services_used, "w") as f:

            if (self.checkBoxPotpis.isChecked() == True):
                f.write("1 ")
            else:
                f.write("0 ")

            if (self.checkBoxKompresija.isChecked() == True):
                f.write("1 ")
            else:
                f.write("0 ")

            if (self.checkBoxEnkripcija.isChecked() == True):
                f.write("1 ")
            else:
                f.write("0 ")

            if (self.checkBoxRadix64.isChecked() == True):
                f.write("1")
            else:
                f.write("0")
        f.close()

        # RESETOVANJE SVIH KLJUCEVA I ID KLJUCEVA
        from ReceiveMessage import Ui_receive_message_window

        # U SEND MESSAGE
        self.temp_key_id_for_PRa = 0
        self.temp_key_id_for_PUb = 0
        self.temp_PRa = 0

        # U RECEIVE MESSAGE
        Ui_receive_message_window.temp_key_id_for_PUa = 0
        Ui_receive_message_window.temp_key_id_for_PRb = 0
        Ui_receive_message_window.temp_PRb = 0


        if self.parent is not None:
            self.parent.show()
            self.Ui_send_message_window.hide()




    def show_popup(self):
        msg = QtWidgets.QMessageBox()
        msg.setWindowTitle("Incomplete form")
        msg.setText("You didn't fill in all fields.")
        msg.setIcon(QtWidgets.QMessageBox.Warning)
        msg.setStandardButtons(QtWidgets.QMessageBox.Cancel)
        msg.setInformativeText("Please, fill in all of the fields!")

        msg.buttonClicked.connect(self.popup_button)
        x = msg.exec_()

    def popup_button(self, i):
        # da bismo videli da je dugme pritisnuto:
        print(i.text())

    def retranslateUi(self, send_message_window):
        _translate = QtCore.QCoreApplication.translate
        send_message_window.setWindowTitle(_translate("send_message_window", "SendMessage"))
        self.enter_text_msg_label.setText(_translate("send_message_window", "Enter text message: "))
        self.PRa_choice_window_btn.setText(_translate("send_message_window", "Choose PRa for Digital Signature"))
        self.PUb_choice_window_btn.setText(_translate("send_message_window", "Choose PUb for Message Encryption"))
        self.choose_sym_alg_label.setText(_translate("send_message_window", "Choose Symetrical Algorithm: "))
        self.triple_des_radio_btn.setText(_translate("send_message_window", "TRIPLE DES"))
        self.aes128_radio_btn.setText(_translate("send_message_window", "AES128"))
        self.finish_sending_btn.setText(_translate("send_message_window", "SEND"))
        self.labela_ime_datoteka.setText(_translate("send_message_window", "Unesite ime datoteke: "))
        self.labela_ime_datoteka.adjustSize()

        self.checkBoxEnkripcija.setText(_translate("MainWindow", "enrpicija"))
        self.checkBoxPotpis.setText(_translate("MainWindow", "potpis"))
        self.checkBoxKompresija.setText(_translate("MainWindow", "kompresija"))
        self.checkBoxRadix64.setText(_translate("MainWindow", "radix-64"))

if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    send_message_window = QtWidgets.QMainWindow()
    ui = Ui_send_message_window()
    ui.setupUi(send_message_window)
    send_message_window.show()
    sys.exit(app.exec_())
