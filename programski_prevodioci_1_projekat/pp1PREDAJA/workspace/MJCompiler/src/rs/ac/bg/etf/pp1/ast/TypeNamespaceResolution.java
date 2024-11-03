// generated with ast extension for cup
// version 0.8
// 26/7/2024 12:17:52


package rs.ac.bg.etf.pp1.ast;

public class TypeNamespaceResolution extends Type {

    private String I1;
    private String typeNameNSR;

    public TypeNamespaceResolution (String I1, String typeNameNSR) {
        this.I1=I1;
        this.typeNameNSR=typeNameNSR;
    }

    public String getI1() {
        return I1;
    }

    public void setI1(String I1) {
        this.I1=I1;
    }

    public String getTypeNameNSR() {
        return typeNameNSR;
    }

    public void setTypeNameNSR(String typeNameNSR) {
        this.typeNameNSR=typeNameNSR;
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
        buffer.append("TypeNamespaceResolution(\n");

        buffer.append(" "+tab+I1);
        buffer.append("\n");

        buffer.append(" "+tab+typeNameNSR);
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [TypeNamespaceResolution]");
        return buffer.toString();
    }
}
