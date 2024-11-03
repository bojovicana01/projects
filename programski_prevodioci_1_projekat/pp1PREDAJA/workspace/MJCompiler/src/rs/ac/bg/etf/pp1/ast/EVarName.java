// generated with ast extension for cup
// version 0.8
// 26/7/2024 12:17:52


package rs.ac.bg.etf.pp1.ast;

public class EVarName extends VarName {

    private String varName;
    private OptSquareBrackets OptSquareBrackets;

    public EVarName (String varName, OptSquareBrackets OptSquareBrackets) {
        this.varName=varName;
        this.OptSquareBrackets=OptSquareBrackets;
        if(OptSquareBrackets!=null) OptSquareBrackets.setParent(this);
    }

    public String getVarName() {
        return varName;
    }

    public void setVarName(String varName) {
        this.varName=varName;
    }

    public OptSquareBrackets getOptSquareBrackets() {
        return OptSquareBrackets;
    }

    public void setOptSquareBrackets(OptSquareBrackets OptSquareBrackets) {
        this.OptSquareBrackets=OptSquareBrackets;
    }

    public void accept(Visitor visitor) {
        visitor.visit(this);
    }

    public void childrenAccept(Visitor visitor) {
        if(OptSquareBrackets!=null) OptSquareBrackets.accept(visitor);
    }

    public void traverseTopDown(Visitor visitor) {
        accept(visitor);
        if(OptSquareBrackets!=null) OptSquareBrackets.traverseTopDown(visitor);
    }

    public void traverseBottomUp(Visitor visitor) {
        if(OptSquareBrackets!=null) OptSquareBrackets.traverseBottomUp(visitor);
        accept(visitor);
    }

    public String toString(String tab) {
        StringBuffer buffer=new StringBuffer();
        buffer.append(tab);
        buffer.append("EVarName(\n");

        buffer.append(" "+tab+varName);
        buffer.append("\n");

        if(OptSquareBrackets!=null)
            buffer.append(OptSquareBrackets.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [EVarName]");
        return buffer.toString();
    }
}
