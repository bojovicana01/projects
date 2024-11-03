// generated with ast extension for cup
// version 0.8
// 26/7/2024 12:17:52


package rs.ac.bg.etf.pp1.ast;

public class DesignatorStatementEQUAL extends DesignatorStatement {

    private DesignatorStatementAssigment DesignatorStatementAssigment;

    public DesignatorStatementEQUAL (DesignatorStatementAssigment DesignatorStatementAssigment) {
        this.DesignatorStatementAssigment=DesignatorStatementAssigment;
        if(DesignatorStatementAssigment!=null) DesignatorStatementAssigment.setParent(this);
    }

    public DesignatorStatementAssigment getDesignatorStatementAssigment() {
        return DesignatorStatementAssigment;
    }

    public void setDesignatorStatementAssigment(DesignatorStatementAssigment DesignatorStatementAssigment) {
        this.DesignatorStatementAssigment=DesignatorStatementAssigment;
    }

    public void accept(Visitor visitor) {
        visitor.visit(this);
    }

    public void childrenAccept(Visitor visitor) {
        if(DesignatorStatementAssigment!=null) DesignatorStatementAssigment.accept(visitor);
    }

    public void traverseTopDown(Visitor visitor) {
        accept(visitor);
        if(DesignatorStatementAssigment!=null) DesignatorStatementAssigment.traverseTopDown(visitor);
    }

    public void traverseBottomUp(Visitor visitor) {
        if(DesignatorStatementAssigment!=null) DesignatorStatementAssigment.traverseBottomUp(visitor);
        accept(visitor);
    }

    public String toString(String tab) {
        StringBuffer buffer=new StringBuffer();
        buffer.append(tab);
        buffer.append("DesignatorStatementEQUAL(\n");

        if(DesignatorStatementAssigment!=null)
            buffer.append(DesignatorStatementAssigment.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [DesignatorStatementEQUAL]");
        return buffer.toString();
    }
}
