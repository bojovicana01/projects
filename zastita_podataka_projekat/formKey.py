import os

from PyQt5 import QtCore, QtGui, QtWidgets
import sys, res2

from PyQt5.QtWidgets import QButtonGroup
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization

from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.backends import default_backend

from main import triple_des_encrypt, triple_des_decrypt

import secrets
import base64

class Ui_Form(object):

    global_key_id = 0
    def setupUi(self, Form, parentWindow=None):

        # GENERALNA PODESAVANJA FORME
        self.Form = Form
        self.parentWindow=parentWindow
        Form.setObjectName("Form")
        Form.resize(420, 500)
        self.widget = QtWidgets.QWidget(Form)
        self.widget.setGeometry(QtCore.QRect(40, 10, 370, 480))
        self.widget.setObjectName("widget")

        # LABELE ZA SVAKO POLJE KOJE SE UNOSI
        self.label = QtWidgets.QLabel(self.widget)
        self.label.setGeometry(QtCore.QRect(30, 30, 300, 420))
        self.label.setStyleSheet("border-image: url(:/images/key.jpg);\n"
                                 "border-radius:20px;")
        self.label.setText("")
        self.label.setObjectName("label")
        self.label_2 = QtWidgets.QLabel(self.widget)
        self.label_2.setGeometry(QtCore.QRect(30, 30, 300, 420))
        self.label_2.setStyleSheet(
            "background-color: qlineargradient(spread:pad, x1:5, y1:5, x2:2, y2:1.715909, stop:0.375 rgba(200, 200, 200, 200), stop:0.8675 rgba(200,200, 200, 150));\n"
            "border-radius:20px;")
        self.label_2.setText("")
        self.label_2.setObjectName("label_2")
        self.label_3 = QtWidgets.QLabel(self.widget)
        self.label_3.setGeometry(QtCore.QRect(39, 39, 281, 401))
        self.label_3.setStyleSheet("background-color:rgba(0,0,0,80);\n"
                                   "border-radius:15px;")
        self.label_3.setText("")
        self.label_3.setObjectName("label_3")
        self.label_4 = QtWidgets.QLabel(self.widget)
        self.label_4.setGeometry(QtCore.QRect(90, 60, 191, 41))
        font = QtGui.QFont()
        font.setPointSize(12)
        font.setBold(True)
        font.setWeight(75)
        self.label_4.setFont(font)
        self.label_4.setStyleSheet("color:rgba(255,255,255,210);")
        self.label_4.setObjectName("label_4")

        # POLJA ZA UNOS SVIH NEOPHODNIH PODATAKA
        self.lineEdit = QtWidgets.QLineEdit(self.widget)
        self.lineEdit.setGeometry(QtCore.QRect(90, 120, 200, 40))
        font = QtGui.QFont()
        font.setPointSize(10)
        font.setBold(True)
        font.setWeight(75)
        self.lineEdit.setFont(font)
        self.lineEdit.setStyleSheet("background-color: rgb(0, 0, 0,0);\n"
                                    "border:none;\n"
                                    "border-bottom: 2px solid rgba(71,71,71,255);\n"
                                    "color: rgb(71, 71, 71);\n"
                                    "color:rgba(255,255,255,230);\n"
                                    "padding-bottom: 7px;")
        self.lineEdit.setObjectName("lineEdit")
        self.lineEdit_2 = QtWidgets.QLineEdit(self.widget)
        self.lineEdit_2.setGeometry(QtCore.QRect(90, 180, 200, 40))
        font = QtGui.QFont()
        font.setPointSize(10)
        font.setBold(True)
        font.setWeight(75)
        self.lineEdit_2.setFont(font)
        self.lineEdit_2.setStyleSheet("background-color: rgb(0, 0, 0,00);\n"
                                      "border:none;\n"
                                      "border-bottom: 2px solid rgba(71,71,71,255);\n"
                                      "color: rgb(71, 71, 71);\n"
                                      "color:rgba(255,255,255,230);\n"
                                      "padding-bottom: 7px;")
        self.lineEdit_2.setText("")
        self.lineEdit_2.setObjectName("lineEdit_2")

        # ODABIR VELICINE KLJUCA
        self.label_5 = QtWidgets.QLabel(self.widget)
        self.label_5.setGeometry(QtCore.QRect(90, 290, 91, 21))
        font = QtGui.QFont()
        font.setPointSize(10)
        self.label_5.setFont(font)
        self.label_5.setStyleSheet(
            "background-color: qlineargradient(spread:pad,x1:0,y1:0.505682,x2:1,y2:0.477, stop:0 rgba(20,47,78,219), stop:1 rgba(85,98,112,226));\n"
            "color:rgba(255,255,255,210);\n"
            "border-radius: 5px;")
        self.label_5.setObjectName("label_5")
        self.radioButton = QtWidgets.QRadioButton(self.widget)
        self.radioButton.setGeometry(QtCore.QRect(140, 320, 95, 20))
        self.radioButton.setStyleSheet("color: rgb(27, 36, 91);")
        self.radioButton.setObjectName("radioButton")
        self.radioButton_2 = QtWidgets.QRadioButton(self.widget)
        self.radioButton_2.setGeometry(QtCore.QRect(140, 340, 95, 20))
        self.radioButton_2.setStyleSheet("color: rgb(27, 36, 91);")
        self.radioButton_2.setObjectName("radioButton_2")

        # DODATNA PODESAVANJA ZA RADIO BUTTON
        self.rb_group = QButtonGroup()
        self.rb_group.addButton(self.radioButton, 1)
        self.rb_group.addButton(self.radioButton_2, 2)

        # SUBMIT BTN
        self.pushButton = QtWidgets.QPushButton(self.widget)
        self.pushButton.setGeometry(QtCore.QRect(90, 370, 171, 31))
        font = QtGui.QFont()
        font.setPointSize(12)
        self.pushButton.setFont(font)
        self.pushButton.setStyleSheet("QPushButton#pushButton{\n"
                                      "    background-color: qlineargradient(spread:pad,x1:0,y1:0.505682,x2:1,y2:0.477, stop:0 rgba(20,47,78,219), stop:1 rgba(85,98,112,226));\n"
                                      "\n"
                                      "    color:rgba(255,255,255,210);\n"
                                      "    border-radius: 5px;\n"
                                      "}\n"
                                      "QPushButton#pushButton:hover{\n"
                                      "    background-color: qlineargradient(spread:pad,x1:0,y1:0.505682,x2:1,y2:0.477, stop:0 rgba(40,67,98,219), stop:1 rgba(85,98,112,226));\n"
                                      "\n"
                                      "    color:rgba(255,255,255,210);\n"
                                      "    border-radius: 5px;\n"
                                      "}\n"
                                      "QPushButton#pushButton:pressed{\n"
                                      "    padding-left: px;\n"
                                      "    padding-top:px;,\n"
                                      "    backgtound-color:rgba(105,118,132,200);\n"
                                      "},")
        self.pushButton.setObjectName("pushButton")

        # UNOS LOZINKE
        self.lineEdit_3 = QtWidgets.QLineEdit(self.widget)
        self.lineEdit_3.setGeometry(QtCore.QRect(90, 240, 200, 40))
        font = QtGui.QFont()
        font.setPointSize(10)
        font.setBold(True)
        font.setWeight(75)
        self.lineEdit_3.setFont(font)
        self.lineEdit_3.setStyleSheet("background-color: rgb(0, 0, 0,0);\n"
                                      "border:none;\n"
                                      "border-bottom: 2px solid rgba(71,71,71,255);\n"
                                      "color: rgb(71, 71, 71);\n"
                                      "color:rgba(255,255,255,230);\n"
                                      "padding-bottom: 7px;")
        self.lineEdit_3.setText("")
        self.lineEdit_3.setEchoMode(QtWidgets.QLineEdit.Password)
        self.lineEdit_3.setObjectName("lineEdit_3")

        # blur efekat za dugmice
        self.label.setGraphicsEffect(QtWidgets.QGraphicsDropShadowEffect(blurRadius=25,
                                                                         xOffset=0, yOffset=0,
                                                                         color=QtGui.QColor(234, 221, 186, 100)))
        self.label_3.setGraphicsEffect(QtWidgets.QGraphicsDropShadowEffect(blurRadius=25,
                                                                           xOffset=0, yOffset=0,
                                                                           color=QtGui.QColor(234, 221, 186, 100)))
        self.pushButton.setGraphicsEffect(QtWidgets.QGraphicsDropShadowEffect(blurRadius=25,
                                                                              xOffset=0, yOffset=0,
                                                                              color=QtGui.QColor(234, 221, 186, 100)))
        #povezivanje dugmeta Generate sa funkcijom
        self.pushButton.clicked.connect(self.generate_keys)

        self.retranslateUi(Form)
        QtCore.QMetaObject.connectSlotsByName(Form)

    def retranslateUi(self, Form):
        _translate = QtCore.QCoreApplication.translate
        Form.setWindowTitle(_translate("Form", "Form"))
        self.label_4.setText(_translate("Form", "Generate new pair"))
        self.lineEdit.setPlaceholderText(_translate("Form", "Username"))
        self.lineEdit_2.setPlaceholderText(_translate("Form", "email"))
        self.label_5.setText(_translate("Form", "Key Length:"))
        self.radioButton.setText(_translate("Form", "1024 b"))
        self.radioButton_2.setText(_translate("Form", "2048 b"))
        self.pushButton.setText(_translate("Form", "Generate"))
        self.lineEdit_3.setPlaceholderText(_translate("Form", "Password"))

    def generate_keys(self):
        # smestamo vrednosti iz LineEdit polja u promenljive
        username = self.lineEdit.text()
        email = self.lineEdit_2.text()
        password = self.lineEdit_3.text()

        # RANDOM GENERISAN KEY ID
        if not os.path.exists("key_ids_dir"):
            os.makedirs("key_ids_dir")
        key_ids_file_path = os.path.join("key_ids_dir/", "key_ids_file.txt")

        key_id = secrets.randbits(64) # key_id je tipa int

        while (key_id == 0):
            key_id = secrets.randbits(64)

        if os.path.exists(key_ids_file_path):
            with open(key_ids_file_path, 'r') as file:
                for line in file:
                    all_key_ids = line.split(' ')

                flag_same_id_exists = True
                while (flag_same_id_exists):
                    flag_same_id_exists = False
                    for id in all_key_ids:
                        if (id == key_id or key_id == 0):
                            flag_same_id_exists = True
                            key_id = secrets.randbits(64)
                            break
            file.close()



        # u slucaju da nismo uneli sve podatke popupWindow
        if (username == "" or email == "" or password == ""):
            self.show_popup()
            return

        print("Username: " + username)
        print("Email: " + email)
        print("Password: " + password)
        print("Key ID: " + str(key_id))

        # Dohvatanje velicine kljuca
        if(self.rb_group.checkedId() == 1):
            key_size = 1024
        elif(self.rb_group.checkedId()==2):
            key_size = 2048
        print("Key size: ", str(key_size))

        # generisanje privatnog kljuca
        private_key = rsa.generate_private_key(public_exponent=65537, key_size=key_size)
        public_key = private_key.public_key()

        # serijalizacija privatnog kljuca u pem formatu
        pem_pr_key = private_key.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.TraditionalOpenSSL,
            encryption_algorithm=serialization.NoEncryption()
        )

        # serijalizacija public kljuca u pem formatu
        pem_pu_key = public_key.public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo
        )

        #---------------------------------------------------------------------------------------------------------------
        # HESIRANJE LOZINKE KAKO BI SE KORISTILA ZA ENKRIPCIJU PR-a U .pem FORMATU
        hash_method = hashes.Hash(hashes.SHA1(), backend=default_backend())
        password_bytes = password.encode('utf-8')
        hash_method.update(password_bytes)
        password_hash_bytes = hash_method.finalize()
        password_hash_hex = password_hash_bytes.hex()

        #padded_password_hash_bytes = password_hash_bytes + b'\x00\x00\x00\x00'

        # ENKRIPCIJA PR-A KORISTECI KAO KLJUC HESIRANU LOZINKU
        pem_encrypted_private_key = triple_des_encrypt(pem_pr_key, password_hash_bytes)

        # ---------------------------------------------------------------------------------------------------------------

        print("************************************************************************")
        print("pem_pr_key: " + pem_pr_key.decode('utf-8'))
        print("pem_encrypted_private_key: " + str(pem_encrypted_private_key.hex()))
        print("************************************************************************")

        # ---------------------------------------------------------------------------------------------------------------

        # ispisivanje kljuceva
        print(pem_pr_key.decode('utf-8'))
        print(pem_pu_key.decode('utf-8'))

        # KEY ID UPIS U FAJL
        with open(key_ids_file_path, 'a') as file:
            file.write((str(key_id) + ' '))
        file.close()

        # PRIVATE KEY UPIS U FAJL I KAO .pem I KAO SIFROVANI
        if not os.path.exists("private_keys"):
            os.makedirs("private_keys")

        file_path = os.path.join("private_keys/", username +'.pem')
        #upis privatnog kljuca u .pem fomratu
        with open(file_path, 'wb') as f:
            f.write(pem_pr_key)

        file_path_encrypted = os.path.join("private_keys/", username + '.txt')
        # upis privatnog kljuca ENKRIPTOVANOG
        with open(file_path_encrypted, 'w') as file:
            file.write(str(key_id) + ' admin ')
            file.write(base64.b64encode(pem_pu_key).decode('utf-8') + ' admin ')
            file.write(base64.b64encode(pem_encrypted_private_key).decode('utf-8') + ' admin ')
            file.write(str(email))
        file.close()


        # PUBLIC KEY UPIS U FAJL
        if not os.path.exists("public_keys"):
            os.makedirs("public_keys")

        file_path = os.path.join("public_keys/", username  + '.pem')
        file_path2 = os.path.join("public_keys/", username + '.txt')
        # upis javnog kljuca u .pem fomratu
        with open(file_path, 'wb') as f:
            f.write(pem_pu_key)
        with open(file_path2,'w') as f:
            f.write(str(username)+' ')
            f.write(str(email) + ' ')
            f.write(username + '.pem ')
            f.write(str(password) + ' ')
            f.write(str(key_id))

        self.parentWindow.show()
        self.Form.hide()

    # popupWindow za IncompleteForm
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


if __name__ == "__main__":
    import sys

    app = QtWidgets.QApplication(sys.argv)
    Form = QtWidgets.QWidget()
    ui = Ui_Form()
    ui.setupUi(Form)
    Form.show()
    sys.exit(app.exec_())
