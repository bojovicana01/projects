package rs.ac.bg.etf.pp1;

import org.apache.log4j.Logger;

import rs.ac.bg.etf.pp1.ast.*;
import rs.etf.pp1.symboltable.*;
import rs.etf.pp1.symboltable.concepts.*;

public class SemanticAnalyzer extends VisitorAdaptor {
	
	Obj currentMethod = null;
	boolean returnFound = false;
	
	Obj currentConstant = null;
	Struct currentConstantType = null;
	
	Struct currentVarType = null;
	Obj currentVarObj = null;
	
	Obj currentNamespace = null;
	String currentNamespaceName = null;
	
	boolean errorDetected = false;
	int nVars;
	
	Logger log = Logger.getLogger(getClass());
	
	public void report_error(String message, SyntaxNode info) {
		errorDetected = true;
		StringBuilder msg = new StringBuilder(message);
		int line = (info == null) ? 0: info.getLine();
		if (line != 0)
			msg.append (" na liniji ").append(line);
		log.error(msg.toString());
	}

	public void report_info(String message, SyntaxNode info) {
		StringBuilder msg = new StringBuilder(message); 
		int line = (info == null) ? 0: info.getLine();
		if (line != 0)
			msg.append (" na liniji ").append(line);
		log.info(msg.toString());
	}
	
	//------------------------------------------------------------------------------------------------VISIT METODE
	
	
	
	
	// **** PROGRAM **********************************************************************************************
	
	public void visit(ProgramName programName) {
		programName.obj = SymbolTableTab.insert(Obj.Prog, programName.getProgramName(), SymbolTableTab.noType); 
		SymbolTableTab.openScope(); 
		// otvara se Scope i vezuje se kasnije za programName objekat koji smo sad kreirali
	}
	
	public void visit(Program program) {
		nVars = SymbolTableTab.currentScope.getnVars();
		SymbolTableTab.chainLocalSymbols(program.getProgramName().obj); 
		// vezujemo za programName objekat koji iz programa koji je i sam objekat dohvatamo kao objekat
		SymbolTableTab.closeScope();
	}
	
	// ***********************************************************************************************************
	
	
	
	
	// **** TYPE *************************************************************************************************
	
	public void visit(TypeSimple typeSimple) {
		
		Obj typeNode = SymbolTableTab.find(typeSimple.getTypeNameSimple());
		
		if (typeNode == Tab.noObj) { 
			report_error("Nije pronadjen tip " + typeSimple.getTypeNameSimple() + " u tabeli simbola! ", null);
			typeSimple.struct = Tab.noType;
		}
		else {
			if (Obj.Type == typeNode.getKind()) {
				typeSimple.struct = typeNode.getType();
			}
			else {
				report_error("Greska: Ime " + typeSimple.getTypeNameSimple() + " ne predstavlja tip!", typeSimple);
    			typeSimple.struct = Tab.noType;
			}
		}
		
	}
	
	public void visit(TypeNamespaceResolution typeNamespaceResolution) {
		
		Obj typeNode = SymbolTableTab.find(typeNamespaceResolution.getTypeNameNSR());
		
		if (typeNode == Tab.noObj) { 
			report_error("Nije pronadjen tip " + typeNamespaceResolution.getTypeNameNSR() + " u tabeli simbola! ", null);
			typeNamespaceResolution.struct = Tab.noType;
		}
		else {
			if (Obj.Type == typeNode.getKind()) {
				typeNamespaceResolution.struct = typeNode.getType();
			}
			else {
				report_error("Greska: Ime " + typeNamespaceResolution.getTypeNameNSR() + " ne predstavlja tip!", typeNamespaceResolution);
				typeNamespaceResolution.struct = Tab.noType;
			}
		}
		
	}
	
	// ***********************************************************************************************************
	
	
	
	
	// **** CONSTANTS ********************************************************************************************
	
	public void visit(ConstantTypeName constantTypeName) {
		String cnstName = constantTypeName.getConstantName();
		
		if (SymbolTableTab.find(cnstName) != SymbolTableTab.noObj) {
			report_error("Greska: Konstanta - " + cnstName + " - vec postoji!", null);
		}
		else {
			if (currentNamespace != null) {
				cnstName = currentNamespaceName.concat(cnstName);
			}
			
			currentConstantType = constantTypeName.getType().struct;
			currentConstant = SymbolTableTab.insert(Obj.Con, cnstName, constantTypeName.getType().struct);
			
			report_info("Deklarisana konstanta "+ cnstName, constantTypeName);
		}
	}
	
	public void visit(CName cName) {
		String cnstName = cName.getConstantName();
		
		if (SymbolTableTab.find(cnstName) != SymbolTableTab.noObj) {
			report_error("Greska: Konstanta - " + cnstName + " - vec postoji!", null);
		}
		else {
			if (currentNamespace != null) {
				cnstName = currentNamespaceName.concat(cnstName);
			}
			
			currentConstant = SymbolTableTab.insert(Obj.Con, cnstName, currentConstantType);
			
			report_info("Deklarisana konstanta "+ cnstName, cName);
		}
	}
	
	public void visit(CNumConst cNumConst) {
		if (currentConstantType != SymbolTableTab.intType) report_error("Greska: Tip konstante nije kompatibilan sa vrednoscu koja joj se dodeljuje!", cNumConst);
		if (currentConstant != null) currentConstant.setAdr(cNumConst.getValue());
	}
	
	public void visit(CBoolConst cBoolConst) {
		if (currentConstantType != SymbolTableTab.boolType) report_error("Greska: Tip konstante nije kompatibilan sa vrednoscu koja joj se dodeljuje!", cBoolConst);
		if (currentConstant != null) currentConstant.setAdr(cBoolConst.getValue() == true ? 1 : 0);
	}
	
	public void visit(CCharConst cCharConst) {
		if (currentConstantType != SymbolTableTab.charType) report_error("Greska: Tip konstante nije kompatibilan sa vrednoscu koja joj se dodeljuje!", cCharConst);
		if (currentConstant != null) currentConstant.setAdr(cCharConst.getValue());
	}
	
	public void visit(EConstDecl eConstDecl) {
		
		currentConstantType = null;
		currentConstant = null;
	}
	
	// ***********************************************************************************************************
	
	
	
	
	// **** VARS *************************************************************************************************
	
	// proveri da li postoji vec objeka tsa istim imenom -> find
	
	public void visit(EVarTypeName eVarTypeName) {
		String vname = eVarTypeName.getVarName();
		
		if (SymbolTableTab.find(vname) != SymbolTableTab.noObj) {
			report_error("Greska: Promenljiva - " + vname + " - vec postoji!", null);
		}
		else {
			if (currentNamespace != null) {
				vname = currentNamespaceName.concat(vname);
			}
			
			currentVarType = eVarTypeName.getType().struct;
			Struct vtype = currentVarType;
			
			SyntaxNode optSBrackets = eVarTypeName.getOptSquareBrackets();
			if (optSBrackets instanceof EOptSquareBrackets) {
				
				vtype = new Struct(Struct.Array);
				
				if (((EOptSquareBrackets)optSBrackets).getOptSquareBracketsMatrix() instanceof EOptSquareBracketsMatrix) {
					Struct innerArray = new Struct(Struct.Array);
					innerArray.setElementType(currentVarType);
					
					vtype.setElementType(innerArray);
					
				}
				else 
					vtype.setElementType(currentVarType);
			}
			
			eVarTypeName.obj = SymbolTableTab.insert(Obj.Var, vname, vtype);
			currentVarObj = eVarTypeName.obj;
			
			report_info("Deklarisana promenljiva "+ vname, eVarTypeName);
		}
		
	}
	
	public void visit(EVarName eVarName) {
		String vname = eVarName.getVarName();
		
		if (SymbolTableTab.find(vname) != SymbolTableTab.noObj) {
			report_error("Greska: Promenljiva - " + vname + " - vec postoji!", null);
		}
		else {
			if (currentNamespace != null) {
				vname = currentNamespaceName.concat(vname);
			}
			
			Struct vtype = currentVarType;
			
			SyntaxNode optSBrackets = eVarName.getOptSquareBrackets();
			if (optSBrackets instanceof EOptSquareBrackets) {
				
				vtype = new Struct(Struct.Array);
				
				if (((EOptSquareBrackets)optSBrackets).getOptSquareBracketsMatrix() instanceof EOptSquareBracketsMatrix) {
					Struct innerArray = new Struct(Struct.Array);
					innerArray.setElementType(currentVarType);
					
					vtype.setElementType(innerArray);
				}
				else 
					vtype.setElementType(currentVarType);
			}
			
			eVarName.obj = SymbolTableTab.insert(Obj.Var, vname, vtype);
			currentVarObj = eVarName.obj;
			
			report_info("Deklarisana promenljiva "+ vname, eVarName);
		}
	}
	
	public void visit(EVarDecl eEVarDecl) {
		currentVarType = null;
		currentVarObj = null;
	}
	
	// ***********************************************************************************************************
	
	
	
	
	// **** METHODS **********************************************************************************************
	
	public void visit(EMethodTypeName eMethodTypeName) {
		
		Obj findMeth = SymbolTableTab.find(eMethodTypeName.getMethName());
		if (findMeth != SymbolTableTab.noObj && findMeth.getKind() == SymbolTableObject.Meth) {
			report_error("Greska: Metoda sa imenom - " + eMethodTypeName.getMethName() + " - vec postoji!", eMethodTypeName);
		}
		else {
			
			if (currentNamespace == null) {
				currentMethod = SymbolTableTab.insert(Obj.Meth, eMethodTypeName.getMethName(), eMethodTypeName.getType().struct); 
			}
			else {
				currentMethod = SymbolTableTab.insert(Obj.Meth, currentNamespaceName.concat(eMethodTypeName.getMethName()), eMethodTypeName.getType().struct); 
			}
			
			eMethodTypeName.obj = currentMethod;
			SymbolTableTab.openScope();
			report_info("Obradjuje se funkcija " + eMethodTypeName.getMethName(), eMethodTypeName);
		}
	}
	
	public void visit(VoidMethodTypeName voidMethodTypeName) {
		
		Obj findMeth = SymbolTableTab.find(voidMethodTypeName.getVmethName());
		if (findMeth != SymbolTableTab.noObj && findMeth.getKind() == SymbolTableObject.Meth) {
			report_error("Greska: Metoda sa imenom - " + voidMethodTypeName.getVmethName() + " - vec postoji!", voidMethodTypeName);
		}
		else {
			
			if (currentNamespace == null) {
				currentMethod = SymbolTableTab.insert(Obj.Meth, voidMethodTypeName.getVmethName(), Tab.noType);  
			}
			else {
				currentMethod = SymbolTableTab.insert(Obj.Meth, currentNamespaceName.concat(voidMethodTypeName.getVmethName()), Tab.noType); 
			}
			
			voidMethodTypeName.obj = currentMethod;
			SymbolTableTab.openScope();
			report_info("Obradjuje se funkcija " + voidMethodTypeName.getVmethName(), voidMethodTypeName);
		}
	}
	
	public void visit(MethodDecl methodDecl) {
		if (!returnFound && currentMethod.getType() != SymbolTableTab.noType) // ako metoda treba nesto da vraca a ne vraca
			report_error("Semanticka greska na liniji " + methodDecl.getLine() + ": funkcija " + currentMethod.getName() + " nema return iskaz!", null);
		
		SymbolTableTab.chainLocalSymbols(currentMethod); // sve koje su na currentScope-u uvezuje u locals niz
		SymbolTableTab.closeScope();
		
		returnFound = false;
    	currentMethod = null;
	}
	
	// ***********************************************************************************************************
	
	
	
	
	// **** EXPR *************************************************************************************************
	
	// expr
	
	public void visit(NegativeStartExpr negativeStartExpr) {
		Struct structTerm = negativeStartExpr.getTerm().struct;
		
		if (structTerm == SymbolTableTab.intType) {
			negativeStartExpr.struct = structTerm;
		}
		else{
			report_error("Greska na liniji "+ negativeStartExpr.getLine()+" : nekompatibilni tipovi u izrazu.", null);
			negativeStartExpr.struct = SymbolTableTab.noType;
    	}
	}
	
	public void visit(PositiveStartTermOnlyExpr positiveStartTermOnlyExpr) {
		Struct structTerm = positiveStartTermOnlyExpr.getTerm().struct;
		positiveStartTermOnlyExpr.struct = structTerm;
	}
	
	public void visit(PositiveStartExpr positiveStartExpr) {
		Struct structTerm = positiveStartExpr.getTerm().struct;
		Struct structExpr = positiveStartExpr.getExpr().struct;
		
		if (structTerm == SymbolTableTab.intType && structExpr == SymbolTableTab.intType) {
			positiveStartExpr.struct = structTerm;
		}
		else{
			report_error("Greska na liniji "+ positiveStartExpr.getLine()+" : nekompatibilni tipovi u izrazu.", null);
			positiveStartExpr.struct = SymbolTableTab.noType;
    	}
	}
	
	// term
	
	public void visit(Term term) {
		Struct structFactor = term.getFactor().struct;
		Struct structMulopFactorList = term.getMulopFactorList().struct;
		
		if ((structFactor.equals(structMulopFactorList) && structFactor == SymbolTableTab.intType) || 
			(structMulopFactorList  == SymbolTableTab.noType)) {
			term.struct = structFactor;
		}
		else{
			report_error("Greska na liniji "+ term.getLine()+" : nekompatibilni tipovi u izrazu.", null);
			term.struct = SymbolTableTab.noType;
    	}
	}
	
	public void visit(MultipleMulopFactorList mulopFactorList) {
		Struct structFactor = mulopFactorList.getFactor().struct;
		Struct structMulopFactorList = mulopFactorList.getMulopFactorList().struct;
		
		if ((structFactor.equals(structMulopFactorList) || structMulopFactorList == SymbolTableTab.noType) && structFactor == SymbolTableTab.intType) {
			mulopFactorList.struct = structFactor;
		}
		else{
			report_error("Greska na liniji "+ mulopFactorList.getLine()+" : nekompatibilni tipovi u izrazu.", null);
			mulopFactorList.struct = SymbolTableTab.noType;
    	}
	}
	
	public void visit(NoMulopFactorList noMulopFactorList) {
		noMulopFactorList.struct = SymbolTableTab.noType;
	}
	
	
	// factor
	
	public void visit(FactorNumConst factorNumConst) {
		factorNumConst.struct = SymbolTableTab.intType;
	}
	
	public void visit(FactorCharConst factorCharConst) {
		factorCharConst.struct = SymbolTableTab.charType;
	}

	public void visit(FactorBoolConst factorBoolConst) {
		factorBoolConst.struct = SymbolTableTab.boolType;
	}
	
	public void visit(FactorExprInParens factorExprInParens) {
		factorExprInParens.struct = factorExprInParens.getExpr().struct;
	}
	
	public void visit(FactorDesignatorVar factorDesignatorVar) {
		factorDesignatorVar.struct = factorDesignatorVar.getDesignator().obj.getType();
	}
	
	public void visit(FactorDesignatorFunc factorDesignatorFunc) {
		Obj func = factorDesignatorFunc.getDesignator().obj;
		
		if (Obj.Meth == func.getKind()) {
			report_info("Pronadjen poziv funkcije " + func.getName() + " na liniji " + factorDesignatorFunc.getLine(), null);
			factorDesignatorFunc.struct = func.getType();
		}
		else {
			report_error("Greska na liniji " + factorDesignatorFunc.getLine()  +" : ime " + func.getName() + " nije funkcija!", null);
			factorDesignatorFunc.struct = Tab.noType;
		}
	}
	
	public void visit(FactorNew factorNew) {
		if (factorNew.getExpr().struct == SymbolTableTab.intType) {
			
			if (factorNew.getFactorMatrixTypeOptional() instanceof EFactorMatrixTypeOptional) { // NEW MATRIX
				
				if (((EFactorMatrixTypeOptional)factorNew.getFactorMatrixTypeOptional()).getExpr().struct == SymbolTableTab.intType) {
					Struct innerArray = new Struct(Struct.Array, factorNew.getType().struct);
					factorNew.struct = new Struct(Struct.Array, innerArray);
				}
				else {
					report_error("Greska na liniji: " + factorNew.getLine() + ", Velicina niza koja se zadaje mora biti tipa int!", factorNew);
				}
			}
			else // NEW ARRAY
				factorNew.struct = new Struct(Struct.Array, factorNew.getType().struct);
		}
		else {
			report_error("Greska na liniji: " + factorNew.getLine() + ", Velicina niza koja se zadaje mora biti tipa int!", factorNew);
		}
	}
	
	// ***********************************************************************************************************
	
	
	
	
	// **** STATEMENT ********************************************************************************************
	
	// return
	
	public void visit(MatchedReturn matchedReturn) {
		returnFound = true;
		Struct currentMethodType = currentMethod.getType();
		if (!currentMethodType.compatibleWith(matchedReturn.getExpr().struct)) {
			report_error("Greska na liniji " + matchedReturn.getLine() + " : " + "tip izraza u return naredbi ne slaze se sa tipom povratne vrednosti funkcije " + currentMethod.getName(), null);
		}
		else report_info("Linija: " + matchedReturn.getLine() + " : " + "tip izraza u return naredbi se SLAZE sa tipom povratne vrednosti funkcije " + currentMethod.getName(), null);
	}
	
	public void visit(MatchedReturnNone matchedReturnNone) {
		Struct currentMethodType = currentMethod.getType();
		if (!currentMethodType.compatibleWith(SymbolTableTab.noType)) {
			report_error("Greska na liniji: " + matchedReturnNone.getLine() + 
					", Metoda " + currentMethod.getName() + " ima povratnu vrednost iako je tipa VOID!", null);
		}
	}
	
	// read
	
	public void visit(MatchedRead matchedRead) {
		
		if (matchedRead.getDesignator().obj.getKind() == SymbolTableObject.Var 
				|| 
			matchedRead.getDesignator().obj.getKind() == SymbolTableObject.Elem) 
		{
			if (matchedRead.getDesignator().obj.getType() != SymbolTableTab.intType && 
				matchedRead.getDesignator().obj.getType() != SymbolTableTab.charType && 
				matchedRead.getDesignator().obj.getType() != SymbolTableTab.boolType) 
			{
				report_error("Greska na liniji:  " + matchedRead.getLine() + ", READ ne prihvata dati tip", matchedRead);
			}
		}
		else {
			report_error("Greska na liniji:  " + matchedRead.getLine() + ", READ prihvata samo promenljive i elemente niza", matchedRead);
		}
	}
	
	// print
		
	public void visit(MatchedPrintSimple matchedPrintSimple) {
		if (matchedPrintSimple.getExpr().struct != SymbolTableTab.intType && 
			matchedPrintSimple.getExpr().struct != SymbolTableTab.charType && 
			matchedPrintSimple.getExpr().struct != SymbolTableTab.boolType)
		{
			report_error("Greska na liniji:  " + matchedPrintSimple.getLine() + ", PRINT ne prihvata dati tip", matchedPrintSimple);
		}
	}
		
	public void visit(MathchedPrint matchedPrint) {
		if (matchedPrint.getExpr().struct != SymbolTableTab.intType && 
			matchedPrint.getExpr().struct != SymbolTableTab.charType && 
			matchedPrint.getExpr().struct != SymbolTableTab.boolType)
		{
			report_error("Greska na liniji:  " + matchedPrint.getLine() + ", PRINT ne prihvata dati tip", matchedPrint);
		}
	}
	
	// ***********************************************************************************************************
	
	
	
	
	// **** DESIGNATOR *******************************************************************************************
	
	public void visit(DesignatorName designatorName) {
		designatorName.obj = SymbolTableTab.find(designatorName.getName());
	}
	
	public void visit(DesignatorSimple designatorSimple) {
		
		if (designatorSimple.getArrayTypeOptional() instanceof NoArrayTypeOptional) { // IDENT
			
			Obj obj = SymbolTableTab.find(designatorSimple.getDesignatorName().getName());
			if (obj == SymbolTableTab.noObj) 
				report_error("Greska na liniji " + designatorSimple.getLine()+ " : ime "+ designatorSimple.getDesignatorName().getName()+" nije deklarisano! ", null);
			
			designatorSimple.obj = obj;
			
		}
		else { // IDENT [ Expr ] or IDENT [ Expr ] [ Expr ]
			
			// IDENT [ Expr ]
			if (((EArrayTypeOptional)designatorSimple.getArrayTypeOptional()).getMatrixTypeOptional() instanceof NoMatrixTypeOptional) {
				
				if (SymbolTableTab.find(designatorSimple.getDesignatorName().getName()).getType().getKind() == Struct.Array) { // uslov Designator je tipa Struct.Array
					
					if (((EArrayTypeOptional)designatorSimple.getArrayTypeOptional()).getExpr().struct == SymbolTableTab.intType) { // uslov Expr je int tipa
						
						designatorSimple.obj = new Obj(Obj.Elem, 
													   "arrEllem_" + designatorSimple.getDesignatorName().getName(), 
													   SymbolTableTab.find(designatorSimple.getDesignatorName().getName()).getType().getElemType());
					}
					else {
						report_error("Greska: Expr mora biti int tipa!", designatorSimple);
					}
					
				}
				else {
					report_error("Greska: Designator - " + designatorSimple.getDesignatorName().getName() + " - mora biti nizovskog tipa!", designatorSimple);
				}
			}
			
			
			
			// IDENT [ Expr ] [ Expr ]
			else {
				
				Obj arrObjInTab = SymbolTableTab.find(designatorSimple.getDesignatorName().getName());
				
				// uslov Designator je tipa matrice
				if (arrObjInTab.getType().getKind() == Struct.Array && arrObjInTab.getType().getElemType().getKind() == Struct.Array) { 
					
					// uslov oba Expr su int tipa
					if (((EArrayTypeOptional)designatorSimple.getArrayTypeOptional()).getExpr().struct == SymbolTableTab.intType 
							&& 
						((EMatrixTypeOptional)((EArrayTypeOptional)designatorSimple.getArrayTypeOptional()).getMatrixTypeOptional()).getExpr().struct == SymbolTableTab.intType) 
					{ 
						
						designatorSimple.obj = new Obj(Obj.Elem, 
													   "arrEllem_" + designatorSimple.getDesignatorName().getName(), 
													   arrObjInTab.getType().getElemType().getElemType());
					}
					else {
						report_error("Greska: Expr mora biti int tipa!", designatorSimple);
					}
					
				}
				else {
					report_error("Greska: Designator - " + designatorSimple.getDesignatorName().getName() + " - mora biti matricnog tipa!", designatorSimple);
				}
			}
			
		}
	}
	
	public void visit(DesignatorNSR designatorNSR) {
		
		if (SymbolTableTab.find(designatorNSR.getNamespaceName()) == SymbolTableTab.noObj 
				|| 
			SymbolTableTab.find(designatorNSR.getNamespaceName()).getKind() != SymbolTableObject.Namespace) 
		{
			report_error("Greska: Namespace - " + designatorNSR.getNamespaceName() + " - ne postoji ili nije tipa Namespace!", designatorNSR);
		}
		else {
			
			String desName = designatorNSR.getNamespaceName().concat("::");
			desName = desName.concat(designatorNSR.getDesignatorName().getName());
			
			if (designatorNSR.getArrayTypeOptional() instanceof NoArrayTypeOptional) { // IDENT::IDENT
				
				Obj obj = SymbolTableTab.find(desName);
				if (obj == SymbolTableTab.noObj) 
					report_error("Greska na liniji " + designatorNSR.getLine()+ " : ime "+ desName +" nije deklarisano! ", null);
				
				designatorNSR.obj = obj;
				
			}
			else { // IDENT::IDENT [ Expr ] or IDENT::IDENT [ Expr ] [ Expr ]
				
				// IDENT::IDENT [ Expr ]
				if (((EArrayTypeOptional)designatorNSR.getArrayTypeOptional()).getMatrixTypeOptional() instanceof NoMatrixTypeOptional) {
					
					if (SymbolTableTab.find(desName).getType().getKind() == Struct.Array) { // uslov Designator je tipa Struct.Array
						
						if (((EArrayTypeOptional)designatorNSR.getArrayTypeOptional()).getExpr().struct == SymbolTableTab.intType) { // uslov Expr je int tipa
							
							designatorNSR.obj = new Obj(Obj.Elem, 
														   "arrEllem_" + desName, 
														   SymbolTableTab.find(desName).getType().getElemType());
						}
						else {
							report_error("Greska: Expr mora biti int tipa!", designatorNSR);
						}
						
					}
					else {
						report_error("Greska: Designator - " + desName + " - mora biti nizovskog tipa!", designatorNSR);
					}
				}
				
				
				// IDENT::IDENT [ Expr ] [ Expr ]
				else {
					if (SymbolTableTab.find(desName).getType().getKind() == Struct.Array 
							&& 
						SymbolTableTab.find(desName).getType().getElemType().getKind() == Struct.Array)
						
					{ // uslov Designator je tipa matrice
						
						if (((EArrayTypeOptional)designatorNSR.getArrayTypeOptional()).getExpr().struct == SymbolTableTab.intType) { // uslov Expr je int tipa
							
							designatorNSR.obj = new Obj(Obj.Elem, 
														   "arrEllem_" + desName, 
														   SymbolTableTab.find(desName).getType().getElemType().getElemType());
						}
						else {
							report_error("Greska: Expr mora biti int tipa!", designatorNSR);
						}
						
					}
					else {
						report_error("Greska: Designator - " + desName + " - mora biti matricnog tipa!", designatorNSR);
					}
				}
				
			}
		}
	}
	
	public void visit(DesignatorStatementINCREMENT designatorStatementINCREMENT) {
		if (designatorStatementINCREMENT.getDesignator().obj.getKind() == SymbolTableObject.Var || 
			designatorStatementINCREMENT.getDesignator().obj.getKind() == SymbolTableObject.Elem) {
				
			if (designatorStatementINCREMENT.getDesignator().obj.getType() != SymbolTableTab.intType) 
			{
				report_error("Greska pri inkrementiranju, na liniji: " + designatorStatementINCREMENT.getLine() + 
						", Designator mora biti int tipa!", designatorStatementINCREMENT);
			}
				
		}
		else {
			report_error("Greska pri inkrementiranju, na liniji: " + designatorStatementINCREMENT.getLine() + 
					", Designator mora oznacavati ili promenljivu ili element niza!", designatorStatementINCREMENT);
		}
	}
	
	public void visit(DesignatorStatementDECREMENT designatorStatementDECREMENT) {
		if (designatorStatementDECREMENT.getDesignator().obj.getKind() == SymbolTableObject.Var || 
			designatorStatementDECREMENT.getDesignator().obj.getKind() == SymbolTableObject.Elem) {
				
			if (designatorStatementDECREMENT.getDesignator().obj.getType() != SymbolTableTab.intType) 
			{
				report_error("Greska pri dekrementiranju, na liniji: " + designatorStatementDECREMENT.getLine() + 
						", Designator mora biti int tipa!", designatorStatementDECREMENT);
			}
				
		}
		else {
			report_error("Greska pri dekrementiranju, na liniji: " + designatorStatementDECREMENT.getLine() + 
					", Designator mora oznacavati ili promenljivu ili element niza!", designatorStatementDECREMENT);
		}
	}
	
	public void visit(EDesignatorStatementAssigment eDesignatorStatementAssigment) {
		
		if (eDesignatorStatementAssigment.getDesignator().obj.getKind() == SymbolTableObject.Var || 
			eDesignatorStatementAssigment.getDesignator().obj.getKind() == SymbolTableObject.Elem) {
			
			if (!eDesignatorStatementAssigment.getDesignator().obj.getType().compatibleWith(eDesignatorStatementAssigment.getExpr().struct)) 
			{
				report_error("Greska pri dodeli, na liniji: " + eDesignatorStatementAssigment.getLine() + 
						", Designator mora biti kompatibilnog tipa sa Expr!", eDesignatorStatementAssigment);
				
				report_info("eDesignatorStatementAssigment.getDesignator().obj.getType(): " + eDesignatorStatementAssigment.getDesignator().obj.getType().getKind(), eDesignatorStatementAssigment);
				report_info("eDesignatorStatementAssigment.getExpr().struct: " + eDesignatorStatementAssigment.getExpr().struct.getKind(), eDesignatorStatementAssigment);
			}
			
		}
		else {
			report_error("Greska pri dodeli, na liniji: " + eDesignatorStatementAssigment.getLine() + 
					", Designator mora oznacavati ili promenljivu ili element niza!", eDesignatorStatementAssigment);
		}
	}
	
	// ***********************************************************************************************************
	
	
	// **** NAMESPACE ********************************************************************************************
	
	public void visit(NamespaceName namespaceName) {
		if (SymbolTableTab.find(namespaceName.getNamespaceName()) != Tab.noObj) {
			report_error("Greska: Namespace sa imenom - " + namespaceName.getNamespaceName() + " - vec postoji!" , namespaceName);
		}
		else {
			currentNamespace = SymbolTableTab.insert(SymbolTableObject.Namespace, namespaceName.getNamespaceName(), SymbolTableTab.noType);
			currentNamespaceName = currentNamespace.getName().concat("::");
			namespaceName.obj = currentNamespace;
		}
	}
	
	public void visit(Namespace namespace) {
		currentNamespace = null;
	}
	
	// ***********************************************************************************************************
    
    
    public boolean passed(){
    	return !errorDetected;
    }

}
