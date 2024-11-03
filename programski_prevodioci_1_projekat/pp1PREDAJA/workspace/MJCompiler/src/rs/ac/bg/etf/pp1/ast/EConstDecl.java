// generated with ast extension for cup
// version 0.8
// 26/7/2024 12:17:52


package rs.ac.bg.etf.pp1.ast;

public class EConstDecl extends ConstDecl {

    private ConstantTypeName ConstantTypeName;
    private Constant Constant;
    private ConstDeclListSingleType ConstDeclListSingleType;

    public EConstDecl (ConstantTypeName ConstantTypeName, Constant Constant, ConstDeclListSingleType ConstDeclListSingleType) {
        this.ConstantTypeName=ConstantTypeName;
        if(ConstantTypeName!=null) ConstantTypeName.setParent(this);
        this.Constant=Constant;
        if(Constant!=null) Constant.setParent(this);
        this.ConstDeclListSingleType=ConstDeclListSingleType;
        if(ConstDeclListSingleType!=null) ConstDeclListSingleType.setParent(this);
    }

    public ConstantTypeName getConstantTypeName() {
        return ConstantTypeName;
    }

    public void setConstantTypeName(ConstantTypeName ConstantTypeName) {
        this.ConstantTypeName=ConstantTypeName;
    }

    public Constant getConstant() {
        return Constant;
    }

    public void setConstant(Constant Constant) {
        this.Constant=Constant;
    }

    public ConstDeclListSingleType getConstDeclListSingleType() {
        return ConstDeclListSingleType;
    }

    public void setConstDeclListSingleType(ConstDeclListSingleType ConstDeclListSingleType) {
        this.ConstDeclListSingleType=ConstDeclListSingleType;
    }

    public void accept(Visitor visitor) {
        visitor.visit(this);
    }

    public void childrenAccept(Visitor visitor) {
        if(ConstantTypeName!=null) ConstantTypeName.accept(visitor);
        if(Constant!=null) Constant.accept(visitor);
        if(ConstDeclListSingleType!=null) ConstDeclListSingleType.accept(visitor);
    }

    public void traverseTopDown(Visitor visitor) {
        accept(visitor);
        if(ConstantTypeName!=null) ConstantTypeName.traverseTopDown(visitor);
        if(Constant!=null) Constant.traverseTopDown(visitor);
        if(ConstDeclListSingleType!=null) ConstDeclListSingleType.traverseTopDown(visitor);
    }

    public void traverseBottomUp(Visitor visitor) {
        if(ConstantTypeName!=null) ConstantTypeName.traverseBottomUp(visitor);
        if(Constant!=null) Constant.traverseBottomUp(visitor);
        if(ConstDeclListSingleType!=null) ConstDeclListSingleType.traverseBottomUp(visitor);
        accept(visitor);
    }

    public String toString(String tab) {
        StringBuffer buffer=new StringBuffer();
        buffer.append(tab);
        buffer.append("EConstDecl(\n");

        if(ConstantTypeName!=null)
            buffer.append(ConstantTypeName.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        if(Constant!=null)
            buffer.append(Constant.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        if(ConstDeclListSingleType!=null)
            buffer.append(ConstDeclListSingleType.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [EConstDecl]");
        return buffer.toString();
    }
}
