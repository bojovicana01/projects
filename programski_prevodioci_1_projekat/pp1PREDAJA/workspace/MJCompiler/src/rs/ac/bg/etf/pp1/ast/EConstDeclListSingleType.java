// generated with ast extension for cup
// version 0.8
// 26/7/2024 12:17:52


package rs.ac.bg.etf.pp1.ast;

public class EConstDeclListSingleType extends ConstDeclListSingleType {

    private ConstDeclListSingleType ConstDeclListSingleType;
    private CName CName;
    private Constant Constant;

    public EConstDeclListSingleType (ConstDeclListSingleType ConstDeclListSingleType, CName CName, Constant Constant) {
        this.ConstDeclListSingleType=ConstDeclListSingleType;
        if(ConstDeclListSingleType!=null) ConstDeclListSingleType.setParent(this);
        this.CName=CName;
        if(CName!=null) CName.setParent(this);
        this.Constant=Constant;
        if(Constant!=null) Constant.setParent(this);
    }

    public ConstDeclListSingleType getConstDeclListSingleType() {
        return ConstDeclListSingleType;
    }

    public void setConstDeclListSingleType(ConstDeclListSingleType ConstDeclListSingleType) {
        this.ConstDeclListSingleType=ConstDeclListSingleType;
    }

    public CName getCName() {
        return CName;
    }

    public void setCName(CName CName) {
        this.CName=CName;
    }

    public Constant getConstant() {
        return Constant;
    }

    public void setConstant(Constant Constant) {
        this.Constant=Constant;
    }

    public void accept(Visitor visitor) {
        visitor.visit(this);
    }

    public void childrenAccept(Visitor visitor) {
        if(ConstDeclListSingleType!=null) ConstDeclListSingleType.accept(visitor);
        if(CName!=null) CName.accept(visitor);
        if(Constant!=null) Constant.accept(visitor);
    }

    public void traverseTopDown(Visitor visitor) {
        accept(visitor);
        if(ConstDeclListSingleType!=null) ConstDeclListSingleType.traverseTopDown(visitor);
        if(CName!=null) CName.traverseTopDown(visitor);
        if(Constant!=null) Constant.traverseTopDown(visitor);
    }

    public void traverseBottomUp(Visitor visitor) {
        if(ConstDeclListSingleType!=null) ConstDeclListSingleType.traverseBottomUp(visitor);
        if(CName!=null) CName.traverseBottomUp(visitor);
        if(Constant!=null) Constant.traverseBottomUp(visitor);
        accept(visitor);
    }

    public String toString(String tab) {
        StringBuffer buffer=new StringBuffer();
        buffer.append(tab);
        buffer.append("EConstDeclListSingleType(\n");

        if(ConstDeclListSingleType!=null)
            buffer.append(ConstDeclListSingleType.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        if(CName!=null)
            buffer.append(CName.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        if(Constant!=null)
            buffer.append(Constant.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [EConstDeclListSingleType]");
        return buffer.toString();
    }
}
