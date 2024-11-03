// generated with ast extension for cup
// version 0.8
// 26/7/2024 12:17:52


package rs.ac.bg.etf.pp1.ast;

public class DesignatorSimple extends Designator {

    private DesignatorName DesignatorName;
    private ArrayTypeOptional ArrayTypeOptional;

    public DesignatorSimple (DesignatorName DesignatorName, ArrayTypeOptional ArrayTypeOptional) {
        this.DesignatorName=DesignatorName;
        if(DesignatorName!=null) DesignatorName.setParent(this);
        this.ArrayTypeOptional=ArrayTypeOptional;
        if(ArrayTypeOptional!=null) ArrayTypeOptional.setParent(this);
    }

    public DesignatorName getDesignatorName() {
        return DesignatorName;
    }

    public void setDesignatorName(DesignatorName DesignatorName) {
        this.DesignatorName=DesignatorName;
    }

    public ArrayTypeOptional getArrayTypeOptional() {
        return ArrayTypeOptional;
    }

    public void setArrayTypeOptional(ArrayTypeOptional ArrayTypeOptional) {
        this.ArrayTypeOptional=ArrayTypeOptional;
    }

    public void accept(Visitor visitor) {
        visitor.visit(this);
    }

    public void childrenAccept(Visitor visitor) {
        if(DesignatorName!=null) DesignatorName.accept(visitor);
        if(ArrayTypeOptional!=null) ArrayTypeOptional.accept(visitor);
    }

    public void traverseTopDown(Visitor visitor) {
        accept(visitor);
        if(DesignatorName!=null) DesignatorName.traverseTopDown(visitor);
        if(ArrayTypeOptional!=null) ArrayTypeOptional.traverseTopDown(visitor);
    }

    public void traverseBottomUp(Visitor visitor) {
        if(DesignatorName!=null) DesignatorName.traverseBottomUp(visitor);
        if(ArrayTypeOptional!=null) ArrayTypeOptional.traverseBottomUp(visitor);
        accept(visitor);
    }

    public String toString(String tab) {
        StringBuffer buffer=new StringBuffer();
        buffer.append(tab);
        buffer.append("DesignatorSimple(\n");

        if(DesignatorName!=null)
            buffer.append(DesignatorName.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        if(ArrayTypeOptional!=null)
            buffer.append(ArrayTypeOptional.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [DesignatorSimple]");
        return buffer.toString();
    }
}
