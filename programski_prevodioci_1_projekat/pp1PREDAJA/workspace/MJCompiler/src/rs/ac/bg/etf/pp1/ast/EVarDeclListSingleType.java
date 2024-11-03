// generated with ast extension for cup
// version 0.8
// 26/7/2024 12:17:52


package rs.ac.bg.etf.pp1.ast;

public class EVarDeclListSingleType extends VarDeclListSingleType {

    private VarDeclListSingleType VarDeclListSingleType;
    private VarName VarName;

    public EVarDeclListSingleType (VarDeclListSingleType VarDeclListSingleType, VarName VarName) {
        this.VarDeclListSingleType=VarDeclListSingleType;
        if(VarDeclListSingleType!=null) VarDeclListSingleType.setParent(this);
        this.VarName=VarName;
        if(VarName!=null) VarName.setParent(this);
    }

    public VarDeclListSingleType getVarDeclListSingleType() {
        return VarDeclListSingleType;
    }

    public void setVarDeclListSingleType(VarDeclListSingleType VarDeclListSingleType) {
        this.VarDeclListSingleType=VarDeclListSingleType;
    }

    public VarName getVarName() {
        return VarName;
    }

    public void setVarName(VarName VarName) {
        this.VarName=VarName;
    }

    public void accept(Visitor visitor) {
        visitor.visit(this);
    }

    public void childrenAccept(Visitor visitor) {
        if(VarDeclListSingleType!=null) VarDeclListSingleType.accept(visitor);
        if(VarName!=null) VarName.accept(visitor);
    }

    public void traverseTopDown(Visitor visitor) {
        accept(visitor);
        if(VarDeclListSingleType!=null) VarDeclListSingleType.traverseTopDown(visitor);
        if(VarName!=null) VarName.traverseTopDown(visitor);
    }

    public void traverseBottomUp(Visitor visitor) {
        if(VarDeclListSingleType!=null) VarDeclListSingleType.traverseBottomUp(visitor);
        if(VarName!=null) VarName.traverseBottomUp(visitor);
        accept(visitor);
    }

    public String toString(String tab) {
        StringBuffer buffer=new StringBuffer();
        buffer.append(tab);
        buffer.append("EVarDeclListSingleType(\n");

        if(VarDeclListSingleType!=null)
            buffer.append(VarDeclListSingleType.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        if(VarName!=null)
            buffer.append(VarName.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [EVarDeclListSingleType]");
        return buffer.toString();
    }
}
