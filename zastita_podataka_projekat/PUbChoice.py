from PyQt5 import QtCore, QtGui, QtWidgets
from SendMessage import Ui_send_message_window
from ReceiveMessage import Ui_receive_message_window
import os


class Ui_PUb_choice_window(object):
    def setupUi(self, PUb_choice_window,parent=None):
        self.parent = parent
        self.PUb_choice_window = PUb_choice_window

        # GENERALNA PODESAVANJA PROZORA
        PUb_choice_window.setObjectName("PUb_choice_window")
        PUb_choice_window.resize(800, 600)
        self.centralwidget = QtWidgets.QWidget(PUb_choice_window)
        self.centralwidget.setObjectName("centralwidget")

        # PODESAVANJA TABELE
        self.PUb_table = QtWidgets.QTableWidget(self.centralwidget)
        self.PUb_table.setGeometry(QtCore.QRect(50, 20, 600, 300))
        self.PUb_table.setObjectName("PUb_table")
        self.PUb_table.setColumnCount(2)
        self.PUb_table.setRowCount(0)

        # PODESAVANJA POLJA TABELE
        # podesavanje hedera i izgleda
        self.PUb_table.setHorizontalHeaderLabels(('KEY ID', 'PUBLIC KEY'))
        self.PUb_table.setColumnWidth(0, 300)
        self.PUb_table.setColumnWidth(1, 300)

        # generisanje polja
        self.generate_table_PUb()

        # SUBMIT PUb BTN
        # self.submit_PRa_btn = QtWidgets.QPushButton(self.centralwidget)
        # self.submit_PRa_btn.setGeometry(QtCore.QRect(480, 390, 171, 71))
        # self.submit_PRa_btn.setObjectName("submit_PRa_btn")

        # DODATNA PODESAVANJA PROZORA
        PUb_choice_window.setCentralWidget(self.centralwidget)
        self.menubar = QtWidgets.QMenuBar(PUb_choice_window)
        self.menubar.setGeometry(QtCore.QRect(0, 0, 800, 26))
        self.menubar.setObjectName("menubar")
        PUb_choice_window.setMenuBar(self.menubar)
        self.statusbar = QtWidgets.QStatusBar(PUb_choice_window)
        self.statusbar.setObjectName("statusbar")
        PUb_choice_window.setStatusBar(self.statusbar)

        self.retranslateUi(PUb_choice_window)
        QtCore.QMetaObject.connectSlotsByName(PUb_choice_window)

        # --> PODESAVANJE FUNKCIONALNOSTI

        self.generate_table_PUb()
        self.PUb_table.cellClicked.connect(self.cell_was_clicked)

    def generate_table_PUb(self):
        directory = "private_keys"
        pr_files = os.listdir(directory)  # vraca imena
        pr_files_txt = [f for f in pr_files if (os.path.isfile(os.path.join(directory, f)) and f.endswith('.txt'))]

        self.all_pu_info = []

        i = 0
        for f in pr_files_txt:
            f_path = "private_keys/" + f
            with open(f_path, 'r') as file:
                for line in file:
                    line_arr = line.split(' admin ')
                    all_pu_info_el = [line_arr[0], line_arr[1]]
                    self.all_pu_info.append(all_pu_info_el)
                    i += 1
            file.close()

        num_of_rows = i
        num_of_cols = 2
        self.PUb_table.setRowCount(num_of_rows)

        for i in range(0, num_of_rows):
            for j in range(0, num_of_cols):
                item = self.all_pu_info[i][j]
                self.PUb_table.setItem(i, j, QtWidgets.QTableWidgetItem(item))
                self.PUb_table.resizeRowsToContents()
                self.PUb_table.resizeColumnsToContents()

    def cell_was_clicked(self, row, column):
        if (column == 0):
            cell = self.PUb_table.item(row, column)
            cell_contents = cell.text()
            Ui_send_message_window.temp_key_id_for_PUb = int(cell_contents)
            Ui_receive_message_window.temp_key_id_for_PUa=int(cell_contents)
            print("temp_key_id_for_PUb: " + cell_contents)
            if self.parent is not None:
                self.parent.show()
                self.PUb_choice_window.hide()

    def retranslateUi(self, PUb_choice_window):
        _translate = QtCore.QCoreApplication.translate
        PUb_choice_window.setWindowTitle(_translate("PUb_choice_window", "PUb_choice_window"))
        # self.submit_PRa_btn.setText(_translate("PUb_choice_window", "Choose"))


if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    PUb_choice_window = QtWidgets.QMainWindow()
    ui = Ui_PUb_choice_window()
    ui.setupUi(PUb_choice_window)
    PUb_choice_window.show()
    sys.exit(app.exec_())
