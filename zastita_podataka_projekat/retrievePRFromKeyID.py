# -*- coding: utf-8 -*-
import os


from PyQt5 import QtCore, QtGui, QtWidgets

from PRaChoice import Ui_PRa_choice_window
from SendMessage import Ui_send_message_window
from ReceiveMessage import Ui_receive_message_window

from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.backends import default_backend

from main import triple_des_decrypt

import base64
from tabela2 import Ui_PR_Key_Ring

from ReceiveMessage import Ui_receive_message_window

class Ui_retrievePR(object):

    key_id = 0

    def setupUi(self, retrievePR_window, key_id_arg,parent=None):
        self.retrievePR_window = retrievePR_window
        self.parent = parent

        # GENERALNA PODESAVANJA PROZORA
        retrievePR_window.setObjectName("password_auth_window")
        retrievePR_window.resize(445, 242)
        self.centralwidget = QtWidgets.QWidget(retrievePR_window)
        self.centralwidget.setObjectName("centralwidget")

        # POLJE ZA UNOS SIFRE
        self.entered_password = QtWidgets.QLineEdit(self.centralwidget)
        self.entered_password.setGeometry(QtCore.QRect(30, 60, 281, 22))
        self.entered_password.setObjectName("entered_password")

        # LABELA ZA POLJE ZA UNOS SIFRE
        self.pass_auth_label = QtWidgets.QLabel(self.centralwidget)
        self.pass_auth_label.setGeometry(QtCore.QRect(30, 20, 191, 16))
        self.pass_auth_label.setObjectName("pass_auth_label")

        #ZA SLUCAJ DA ZELIMO PRIKAZ PR kljuca u labeli
        # self.label = QtWidgets.QLabel(self.centralwidget)
        # self.label.setGeometry(QtCore.QRect(50, 120, 201, 61))
        # self.label.setStyleSheet("background-color: rgb(182, 182, 182);")
        # self.label.setText("")
        # self.label.setObjectName("label")

        #SUBMIT DUGME ZA PROVERU
        self.confir_password_btn = QtWidgets.QPushButton(self.centralwidget)
        self.confir_password_btn.setGeometry(QtCore.QRect(300, 107, 121, 61))
        self.confir_password_btn.setObjectName("confir_password_btn")

        # DODATNA PODESAVANJA PROZORA
        retrievePR_window.setCentralWidget(self.centralwidget)
        self.menubar = QtWidgets.QMenuBar(retrievePR_window)
        self.menubar.setGeometry(QtCore.QRect(0, 0, 445, 26))
        self.menubar.setObjectName("menubar")
        retrievePR_window.setMenuBar(self.menubar)
        self.statusbar = QtWidgets.QStatusBar(retrievePR_window)
        self.statusbar.setObjectName("statusbar")
        retrievePR_window.setStatusBar(self.statusbar)



        self.retranslateUi(retrievePR_window)
        QtCore.QMetaObject.connectSlotsByName(retrievePR_window)

        # PAMCENJE PROSLEDJENOG KEY ID-A
        self.key_id = key_id_arg

        # --> PODESAVANJE FUNKCIONALNOSTI
        self.confir_password_btn.clicked.connect(self.confirm_password)

    def confirm_password(self):

        self.entered_pass = self.entered_password.text()
        if (self.entered_pass == ""):
            self.show_popup()
            return

        directory = "public_keys"

        files = os.listdir(directory)
        files_txt = [f for f in files if (os.path.isfile(os.path.join(directory, f)) and f.endswith('.txt'))]

        for file in files_txt:
            filepath = 'public_keys/' + file
            with open(filepath, 'r') as f:
                for line in f:
                    line_arr = line.split(' ')
                    temp_pass = line_arr[3]
                    temp_key_id = line_arr[4]

                    if (self.key_id == int(temp_key_id)):
                        if (self.entered_pass == temp_pass):
                            self.right_password()
                        else:
                            self.wrong_password()


    def right_password(self):
        directory = "private_keys"

        files = os.listdir(directory)
        files_txt = [f for f in files if (os.path.isfile(os.path.join(directory, f)) and f.endswith('.txt'))]

        for file in files_txt:
            filepath = 'private_keys/' + file
            with open(filepath, 'r') as f:
                for line in f:
                    line_arr = line.split(' admin ')
                    temp_key_id = line_arr[0]
                    temp_encrypted_PR = base64.b64decode(line_arr[2])

                    if (self.key_id == int(temp_key_id)):
                        # ----------------------------------------------------------------------------------------------
                        # HESIRANJE LOZINKE
                        hash_method = hashes.Hash(hashes.SHA1(), backend=default_backend())
                        password_bytes = self.entered_pass.encode('utf-8')
                        hash_method.update(password_bytes)
                        password_hash_bytes = hash_method.finalize()

                        # DEKRIPCIJA PR-A KORISTECI KAO KLJUC HESIRANU LOZINKU
                        pem_PR = triple_des_decrypt(temp_encrypted_PR, password_hash_bytes)

                        # Postavljanje Prb u ReceiveMessage
                        Ui_receive_message_window.temp_PRb = pem_PR
                        Ui_receive_message_window.temp_key_id_for_PRb = self.key_id

                        if self.parent is not  None:
                            self.parent.show()
                            self.retrievePR_window.hide()






    def wrong_password(self):
        Ui_send_message_window.temp_PRa = 0

        msg = QtWidgets.QMessageBox()
        msg.setWindowTitle("Wrong password")
        msg.setText("You didn't enter the right password.")
        msg.setStandardButtons(QtWidgets.QMessageBox.Cancel)
        msg.setInformativeText("Please re-enter the password!")

        msg.buttonClicked.connect(self.popup_button)
        x = msg.exec_()


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

    def retranslateUi(self, password_auth_window):
        _translate = QtCore.QCoreApplication.translate
        password_auth_window.setWindowTitle(_translate("password_auth_window", "password_auth_window"))
        self.pass_auth_label.setText(_translate("password_auth_window", "Enter password: "))
        self.confir_password_btn.setText(_translate("password_auth_window", "Confirm"))


if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    password_auth_window = QtWidgets.QMainWindow()
    ui = Ui_retrievePR()
    ui.setupUi(password_auth_window)
    password_auth_window.show()
    sys.exit(app.exec_())
