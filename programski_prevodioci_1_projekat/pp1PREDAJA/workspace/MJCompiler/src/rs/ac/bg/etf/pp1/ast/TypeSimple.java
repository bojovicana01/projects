// generated with ast extension for cup
// version 0.8
// 26/7/2024 12:17:52


package rs.ac.bg.etf.pp1.ast;

public class TypeSimple extends Type {

    private String typeNameSimple;

    public TypeSimple (String typeNameSimple) {
        this.typeNameSimple=typeNameSimple;
    }

    public String getTypeNameSimple() {
        return typeNameSimple;
    }

    public void setTypeNameSimple(String typeNameSimple) {
        this.typeNameSimple=typeNameSimple;
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
        buffer.append("TypeSimple(\n");

        buffer.append(" "+tab+typeNameSimple);
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [TypeSimple]");
        return buffer.toString();
    }
}
