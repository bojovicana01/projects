// generated with ast extension for cup
// version 0.8
// 26/7/2024 12:17:52


package rs.ac.bg.etf.pp1.ast;

public class EArrayTypeOptional extends ArrayTypeOptional {

    private Expr Expr;
    private MatrixTypeOptional MatrixTypeOptional;

    public EArrayTypeOptional (Expr Expr, MatrixTypeOptional MatrixTypeOptional) {
        this.Expr=Expr;
        if(Expr!=null) Expr.setParent(this);
        this.MatrixTypeOptional=MatrixTypeOptional;
        if(MatrixTypeOptional!=null) MatrixTypeOptional.setParent(this);
    }

    public Expr getExpr() {
        return Expr;
    }

    public void setExpr(Expr Expr) {
        this.Expr=Expr;
    }

    public MatrixTypeOptional getMatrixTypeOptional() {
        return MatrixTypeOptional;
    }

    public void setMatrixTypeOptional(MatrixTypeOptional MatrixTypeOptional) {
        this.MatrixTypeOptional=MatrixTypeOptional;
    }

    public void accept(Visitor visitor) {
        visitor.visit(this);
    }

    public void childrenAccept(Visitor visitor) {
        if(Expr!=null) Expr.accept(visitor);
        if(MatrixTypeOptional!=null) MatrixTypeOptional.accept(visitor);
    }

    public void traverseTopDown(Visitor visitor) {
        accept(visitor);
        if(Expr!=null) Expr.traverseTopDown(visitor);
        if(MatrixTypeOptional!=null) MatrixTypeOptional.traverseTopDown(visitor);
    }

    public void traverseBottomUp(Visitor visitor) {
        if(Expr!=null) Expr.traverseBottomUp(visitor);
        if(MatrixTypeOptional!=null) MatrixTypeOptional.traverseBottomUp(visitor);
        accept(visitor);
    }

    public String toString(String tab) {
        StringBuffer buffer=new StringBuffer();
        buffer.append(tab);
        buffer.append("EArrayTypeOptional(\n");

        if(Expr!=null)
            buffer.append(Expr.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        if(MatrixTypeOptional!=null)
            buffer.append(MatrixTypeOptional.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [EArrayTypeOptional]");
        return buffer.toString();
    }
}
