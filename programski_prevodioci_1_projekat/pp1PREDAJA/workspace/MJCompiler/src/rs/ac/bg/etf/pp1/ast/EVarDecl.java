// generated with ast extension for cup
// version 0.8
// 26/7/2024 12:17:52


package rs.ac.bg.etf.pp1.ast;

public class EVarDecl extends VarDecl {

    private VarTypeName VarTypeName;
    private VarDeclListSingleType VarDeclListSingleType;

    public EVarDecl (VarTypeName VarTypeName, VarDeclListSingleType VarDeclListSingleType) {
        this.VarTypeName=VarTypeName;
        if(VarTypeName!=null) VarTypeName.setParent(this);
        this.VarDeclListSingleType=VarDeclListSingleType;
        if(VarDeclListSingleType!=null) VarDeclListSingleType.setParent(this);
    }

    public VarTypeName getVarTypeName() {
        return VarTypeName;
    }

    public void setVarTypeName(VarTypeName VarTypeName) {
        this.VarTypeName=VarTypeName;
    }

    public VarDeclListSingleType getVarDeclListSingleType() {
        return VarDeclListSingleType;
    }

    public void setVarDeclListSingleType(VarDeclListSingleType VarDeclListSingleType) {
        this.VarDeclListSingleType=VarDeclListSingleType;
    }

    public void accept(Visitor visitor) {
        visitor.visit(this);
    }

    public void childrenAccept(Visitor visitor) {
        if(VarTypeName!=null) VarTypeName.accept(visitor);
        if(VarDeclListSingleType!=null) VarDeclListSingleType.accept(visitor);
    }

    public void traverseTopDown(Visitor visitor) {
        accept(visitor);
        if(VarTypeName!=null) VarTypeName.traverseTopDown(visitor);
        if(VarDeclListSingleType!=null) VarDeclListSingleType.traverseTopDown(visitor);
    }

    public void traverseBottomUp(Visitor visitor) {
        if(VarTypeName!=null) VarTypeName.traverseBottomUp(visitor);
        if(VarDeclListSingleType!=null) VarDeclListSingleType.traverseBottomUp(visitor);
        accept(visitor);
    }

    public String toString(String tab) {
        StringBuffer buffer=new StringBuffer();
        buffer.append(tab);
        buffer.append("EVarDecl(\n");

        if(VarTypeName!=null)
            buffer.append(VarTypeName.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        if(VarDeclListSingleType!=null)
            buffer.append(VarDeclListSingleType.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [EVarDecl]");
        return buffer.toString();
    }
}
