package rs.ac.bg.etf.pp1;

import org.apache.log4j.Logger;
import rs.ac.bg.etf.pp1.ast.*;

public class RuleVisitor extends VisitorAdaptor{

	int printSimpleCallCount = 0;
	int varDeclCount = 0;
	int programDeclCount = 0;
	int nExprDeclCount = 0;
	int pExprDeclCount = 0;
	int designatorStatementEQUALCount = 0;
	int designatorStatementINCREMENTCount = 0;
	int designatorStatementDECREMENTCount = 0;
	int numConstCount = 0;
	int boolConstCount = 0;
	int charConstCount = 0;
	int namespaceCount = 0;
	
	Logger log = Logger.getLogger(getClass());

	public void visit(EVarDecl eVarDecl){
		varDeclCount++;
	}
	
    public void visit(MatchedPrintSimple printSimple) {
		printSimpleCallCount++;
	}
    
    public void visit(Program program) {
		programDeclCount++;
	}
    
    public void visit(NegativeStartExpr negativeStartExpr) {
    	nExprDeclCount++;
	}
    
    public void visit(PositiveStartExpr positiveStartExpr) {
    	pExprDeclCount++;
	}
    
    public void visit(DesignatorStatementEQUAL designatorStatementEQUAL){
		designatorStatementEQUALCount++;
	}
	
    public void visit(DesignatorStatementINCREMENT designatorStatementINCREMENT) {
		designatorStatementINCREMENTCount++;
	}
    
    public void visit(DesignatorStatementDECREMENT designatorStatementDECREMENT) {
		designatorStatementDECREMENTCount++;
	}
    
    public void visit(NumConst numConst) {
    	numConstCount++;
	}
    
    public void visit(BoolConst boolConst) {
    	boolConstCount++;
	}
    
    public void visit(CharConst charConst) {
    	charConstCount++;
	}
    
    public void visit(Namespace namespace) {
    	namespaceCount++;
	}

}
