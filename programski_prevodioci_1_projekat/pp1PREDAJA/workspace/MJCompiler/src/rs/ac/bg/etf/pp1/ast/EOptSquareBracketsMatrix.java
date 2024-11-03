// generated with ast extension for cup
// version 0.8
// 26/7/2024 12:17:52


package rs.ac.bg.etf.pp1.ast;

public class EOptSquareBracketsMatrix extends OptSquareBracketsMatrix {

    public EOptSquareBracketsMatrix () {
    }

    public void accept(Visitor visitor) {
        visitor.visit(this);
    }

    public void childrenAccept(Visitor visitor) {
    }

    public void traverseTopDown(Visitor visitor) {
        accept(visitor);
    }

    public void traverseBottomUp(Visitor visitor) {
        accept(visitor);
    }

    public String toString(String tab) {
        StringBuffer buffer=new StringBuffer();
        buffer.append(tab);
        buffer.append("EOptSquareBracketsMatrix(\n");

        buffer.append(tab);
        buffer.append(") [EOptSquareBracketsMatrix]");
        return buffer.toString();
    }
}
