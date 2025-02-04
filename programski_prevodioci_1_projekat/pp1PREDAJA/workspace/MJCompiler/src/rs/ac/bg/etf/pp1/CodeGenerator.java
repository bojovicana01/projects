package rs.ac.bg.etf.pp1;

import rs.ac.bg.etf.pp1.CounterVisitor.FormParamCounter;
import rs.ac.bg.etf.pp1.CounterVisitor.VarCounter;
import rs.ac.bg.etf.pp1.ast.*;
import rs.etf.pp1.mj.runtime.Code;
import rs.etf.pp1.symboltable.Tab;
import rs.etf.pp1.symboltable.concepts.*;

public class CodeGenerator extends VisitorAdaptor {
	
	Obj currentColNum = SymbolTableTab.insert(Obj.Var, "currentColNum", SymbolTableTab.intType);
	Obj currentCol = SymbolTableTab.insert(Obj.Var, "currentCol", SymbolTableTab.intType);
	
	private int mainPC;
	
	public int getMainPC() {
		return mainPC;
	}
	
	// **** METHODS **********************************************************************************************
	
	public void visit(EMethodTypeName eMethodTypeName) {
		if ("main".equalsIgnoreCase(eMethodTypeName.getMethName())) {
			mainPC = Code.pc;
		}
		
		eMethodTypeName.obj.setAdr(Code.pc);
		SyntaxNode methodNode = eMethodTypeName.getParent();
		
		// Brojimo argumente i lokalne promenljive u Parent-u od EMethodTypeName sto je MethDecl odnosno u deklaraciji metode
		VarCounter varCnt = new VarCounter();
		methodNode.traverseTopDown(varCnt);
		
		FormParamCounter formParamCnt = new FormParamCounter();
		methodNode.traverseTopDown(formParamCnt);
		
		// Enter u metodu
		Code.put(Code.enter);
		Code.put(formParamCnt.getCount());
		Code.put(formParamCnt.getCount() + varCnt.getCount());
	}
	
	public void visit(VoidMethodTypeName voidMethodTypeName) {
		if ("main".equalsIgnoreCase(voidMethodTypeName.getVmethName())) {
			mainPC = Code.pc;
		}
		
		voidMethodTypeName.obj.setAdr(Code.pc);
		SyntaxNode methodNode = voidMethodTypeName.getParent();
		
		// Brojimo argumente i lokalne promenljive u Parent-u od EMethodTypeName sto je MethDecl odnosno u deklaraciji metode
		VarCounter varCnt = new VarCounter();
		methodNode.traverseTopDown(varCnt);
		
		FormParamCounter formParamCnt = new FormParamCounter();
		methodNode.traverseTopDown(formParamCnt);
		
		// Enter u metodu
		Code.put(Code.enter);
		Code.put(formParamCnt.getCount());
		Code.put(formParamCnt.getCount() + varCnt.getCount());
	}
	
	public void visit(MethodDecl methodDecl) {
		Code.put(Code.exit);
		Code.put(Code.return_);
	}
	
	// ***********************************************************************************************************
	
	
	
	
	// **** EXPR *************************************************************************************************
	
	// expr 
	
	public void visit(NegativeStartExpr negativeStartExpr) {
		Code.put(Code.neg);
	}
	
	public void visit(PositiveStartExpr positiveStartExpr) {
		if (positiveStartExpr.getAddop() instanceof Plus) Code.put(Code.add);
		else Code.put(Code.sub);
	}
	
	// term
	
	public void visit(MultipleMulopFactorList multipleMulopFactorList) {
		if (multipleMulopFactorList.getMulop() instanceof Times) Code.put(Code.mul);
		else if (multipleMulopFactorList.getMulop() instanceof Slash) Code.put(Code.div);
		else Code.put(Code.rem);
	}
	
	// factor 
	// -> factor constants
	
	public void visit(FactorNumConst factorNumConst) {
		Obj cnst = SymbolTableTab.insert(SymbolTableObject.Con, "$", factorNumConst.struct);
		cnst.setLevel(0);
		cnst.setAdr(factorNumConst.getNumConst().getValue());
		
		Code.load(cnst);
	}
	
	public void visit(FactorCharConst factorCharConst) {
		Obj cnst = SymbolTableTab.insert(SymbolTableObject.Con, "$", factorCharConst.struct);
		cnst.setLevel(0);
		cnst.setAdr(factorCharConst.getCharConst().getValue());
		
		Code.load(cnst);
	}
	
	public void visit(FactorBoolConst factorBoolConst) {
		Obj cnst = SymbolTableTab.insert(SymbolTableObject.Con, "$", factorBoolConst.struct);
		cnst.setLevel(0);
		cnst.setAdr(factorBoolConst.getBoolConst().getValue() == true ? 1 : 0);
		
		Code.load(cnst);
	}
	
	//-> factor new
	
	public void visit(FactorNew factorNew) {
		
		if (factorNew.getFactorMatrixTypeOptional() instanceof NoFactorMatrixTypeOptional) {
			
			if (factorNew.getType().struct == SymbolTableTab.intType) {
				Code.put(Code.newarray);
				Code.put(1);
			}
			else {
				Code.put(Code.newarray);
				Code.put(0);
			}
		}
		else {
			
			if (factorNew.struct.getElemType().getElemType() == SymbolTableTab.intType) {
				Code.put(Code.dup);
				Code.store(currentColNum);
				Code.put(Code.mul);
				Code.put(Code.newarray);
				Code.put(1);
			}
			else {
				Code.put(Code.dup);
				Code.store(currentColNum);
				Code.put(Code.mul);
				Code.put(Code.newarray);
				Code.put(0);
			}
		}
		
	}
	
	// ***********************************************************************************************************
	
	
	
	
	// **** DESIGNATOR *******************************************************************************************
	
	public void visit(DesignatorName designatorName) {
		
		SyntaxNode parent = designatorName.getParent();
		
		if(EDesignatorStatementAssigment.class != parent.getClass() && FactorDesignatorFunc.class != parent.getClass() && ProcCall.class != parent.getClass()){
			if (parent instanceof DesignatorSimple) {
				if (((DesignatorSimple)parent).getArrayTypeOptional() instanceof EArrayTypeOptional)
					Code.load(designatorName.obj);
			}
			else if (parent instanceof DesignatorNSR) {
				if (((DesignatorNSR)parent).getArrayTypeOptional() instanceof EArrayTypeOptional)
					Code.load(designatorName.obj);
			}
		}
		
		//Code.load(designatorName.obj);
	}
	
	public void visit(DesignatorSimple designatorSimple){
		
		if (designatorSimple.getArrayTypeOptional() instanceof EArrayTypeOptional && 
				((EArrayTypeOptional)designatorSimple.getArrayTypeOptional()).getMatrixTypeOptional() instanceof EMatrixTypeOptional) 
			{
				Code.store(currentCol);
				Code.load(currentColNum);
				Code.put(Code.mul);
				Code.load(currentCol);
				Code.put(Code.add);
				
				if (designatorSimple.getParent() instanceof DesignatorStatementINCREMENT 
						|| 
					designatorSimple.getParent() instanceof DesignatorStatementDECREMENT) Code.put(Code.dup2);
			}
		else if (designatorSimple.getArrayTypeOptional() instanceof EArrayTypeOptional && 
				((EArrayTypeOptional)designatorSimple.getArrayTypeOptional()).getMatrixTypeOptional() instanceof NoMatrixTypeOptional) 
		{
			if (designatorSimple.getParent() instanceof DesignatorStatementINCREMENT 
					|| 
				designatorSimple.getParent() instanceof DesignatorStatementDECREMENT) Code.put(Code.dup2);
		}
		
		SyntaxNode parent = designatorSimple.getParent();
		
		if(EDesignatorStatementAssigment.class != parent.getClass() && FactorDesignatorFunc.class != parent.getClass() && ProcCall.class != parent.getClass()){
			Code.load(designatorSimple.obj);
		}
	}
	
	public void visit(DesignatorNSR designatorNSR){
		
		if (designatorNSR.getArrayTypeOptional() instanceof EArrayTypeOptional && 
				((EArrayTypeOptional)designatorNSR.getArrayTypeOptional()).getMatrixTypeOptional() instanceof EMatrixTypeOptional) 
			{
				Code.store(currentCol);
				Code.load(currentColNum);
				Code.put(Code.mul);
				Code.load(currentCol);
				Code.put(Code.add);
				
				if (designatorNSR.getParent() instanceof DesignatorStatementINCREMENT 
						|| 
					designatorNSR.getParent() instanceof DesignatorStatementDECREMENT) Code.put(Code.dup2);
			}
		else if (designatorNSR.getArrayTypeOptional() instanceof EArrayTypeOptional && 
				((EArrayTypeOptional)designatorNSR.getArrayTypeOptional()).getMatrixTypeOptional() instanceof NoMatrixTypeOptional) 
		{
			if (designatorNSR.getParent() instanceof DesignatorStatementINCREMENT 
					|| 
				designatorNSR.getParent() instanceof DesignatorStatementDECREMENT) Code.put(Code.dup2);
		}
		
		SyntaxNode parent = designatorNSR.getParent();
		
		if(EDesignatorStatementAssigment.class != parent.getClass() && FactorDesignatorFunc.class != parent.getClass() && ProcCall.class != parent.getClass()){
			Code.load(designatorNSR.obj);
		}
	}
	
	public void designatorIncOrDec(SyntaxNode node) {
		Code.put(Code.const_1);
		if (node instanceof DesignatorStatementINCREMENT) Code.put(Code.add);
		else if (node instanceof DesignatorStatementDECREMENT) Code.put(Code.sub);
	}
	
	public void visit(DesignatorStatementDECREMENT designatorStatementDECREMENT) {
		designatorIncOrDec(designatorStatementDECREMENT);
		Code.store(designatorStatementDECREMENT.getDesignator().obj);
	}
	
	public void visit(DesignatorStatementINCREMENT designatorStatementINCREMENT) {
		designatorIncOrDec(designatorStatementINCREMENT);
		Code.store(designatorStatementINCREMENT.getDesignator().obj);
	}
	
	public void visit(EDesignatorStatementAssigment eDesignatorStatementAssigment) {
		Code.store(eDesignatorStatementAssigment.getDesignator().obj);
	}
	
	// ***********************************************************************************************************
	
	
	
	// ************************************* S T A T E M E N T ***************************************************
	
	// print
	
	public void visit(MatchedPrintSimple matchedPrintSimple) {
		if (matchedPrintSimple.getExpr().struct == SymbolTableTab.intType || matchedPrintSimple.getExpr().struct == SymbolTableTab.boolType) {
			Code.loadConst(5);
			Code.put(Code.print);
		}
		else {
			Code.loadConst(1);
			Code.put(Code.bprint);
		}
	}
		
	public void visit(MathchedPrint matchedPrint) {
		if (matchedPrint.getExpr().struct == SymbolTableTab.intType || matchedPrint.getExpr().struct == SymbolTableTab.boolType) {
			Code.loadConst(5);
			Code.put(Code.print);
		}
		else {
			Code.loadConst(1);
			Code.put(Code.bprint);
		}
	}
	
	// read
		
	public void visit(MatchedRead matchedRead) {
		if (matchedRead.getDesignator().obj.getType() == Tab.intType) {
			Code.put(Code.read);
			Code.store(matchedRead.getDesignator().obj);
		}
		else {
			Code.put(Code.bread);
			Code.store(matchedRead.getDesignator().obj);
		}
	}
		
	// return
	
	public void visit(MatchedReturn matchedReturn) {
		Code.put(Code.exit);
		Code.put(Code.return_);
	}
	
	public void visit(MatchedReturnNone matchedReturnNone) {
		Code.put(Code.exit);
		Code.put(Code.return_);
	}
	
	// ***********************************************************************************************************
	

}
