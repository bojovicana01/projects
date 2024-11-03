// generated with ast extension for cup
// version 0.8
// 26/7/2024 12:17:52


package rs.ac.bg.etf.pp1.ast;

public abstract class VisitorAdaptor implements Visitor { 

    public void visit(Unmatched Unmatched) { }
    public void visit(Mulop Mulop) { }
    public void visit(Constant Constant) { }
    public void visit(Matched Matched) { }
    public void visit(Relop Relop) { }
    public void visit(ArrayTypeOptional ArrayTypeOptional) { }
    public void visit(MatrixTypeOptional MatrixTypeOptional) { }
    public void visit(Assignop Assignop) { }
    public void visit(MulopFactorList MulopFactorList) { }
    public void visit(FormalParamDecl FormalParamDecl) { }
    public void visit(Bitop Bitop) { }
    public void visit(VarName VarName) { }
    public void visit(StatementList StatementList) { }
    public void visit(NamespaceList NamespaceList) { }
    public void visit(Addop Addop) { }
    public void visit(OptSquareBrackets OptSquareBrackets) { }
    public void visit(Factor Factor) { }
    public void visit(VarDeclListSingleType VarDeclListSingleType) { }
    public void visit(DeclList DeclList) { }
    public void visit(Designator Designator) { }
    public void visit(FactorMatrixTypeOptional FactorMatrixTypeOptional) { }
    public void visit(VarTypeName VarTypeName) { }
    public void visit(ConstDeclListSingleType ConstDeclListSingleType) { }
    public void visit(ConstDeclList ConstDeclList) { }
    public void visit(ActualParamList ActualParamList) { }
    public void visit(VarDeclList VarDeclList) { }
    public void visit(FormalParamList FormalParamList) { }
    public void visit(Expr Expr) { }
    public void visit(MethodTypeName MethodTypeName) { }
    public void visit(DesignatorStatement DesignatorStatement) { }
    public void visit(DesignatorStatementAssigment DesignatorStatementAssigment) { }
    public void visit(ActualPars ActualPars) { }
    public void visit(Decl Decl) { }
    public void visit(Unaryop Unaryop) { }
    public void visit(Statement Statement) { }
    public void visit(VarDecl VarDecl) { }
    public void visit(Type Type) { }
    public void visit(ConstDecl ConstDecl) { }
    public void visit(MethodDeclList MethodDeclList) { }
    public void visit(FormPars FormPars) { }
    public void visit(OptSquareBracketsMatrix OptSquareBracketsMatrix) { }
    public void visit(AddopTermList AddopTermList) { }
    public void visit(CharConst CharConst) { visit(); }
    public void visit(BoolConst BoolConst) { visit(); }
    public void visit(NumConst NumConst) { visit(); }
    public void visit(CCharConst CCharConst) { visit(); }
    public void visit(CBoolConst CBoolConst) { visit(); }
    public void visit(CNumConst CNumConst) { visit(); }
    public void visit(BitwiseOr BitwiseOr) { visit(); }
    public void visit(BitwiseAnd BitwiseAnd) { visit(); }
    public void visit(Decrement Decrement) { visit(); }
    public void visit(Increment Increment) { visit(); }
    public void visit(Percent Percent) { visit(); }
    public void visit(Slash Slash) { visit(); }
    public void visit(Times Times) { visit(); }
    public void visit(Minus Minus) { visit(); }
    public void visit(Plus Plus) { visit(); }
    public void visit(LessThanOrEqual LessThanOrEqual) { visit(); }
    public void visit(LessThan LessThan) { visit(); }
    public void visit(GreaterThanOrEqual GreaterThanOrEqual) { visit(); }
    public void visit(GreaterThan GreaterThan) { visit(); }
    public void visit(Differs Differs) { visit(); }
    public void visit(Equals Equals) { visit(); }
    public void visit(Equal Equal) { visit(); }
    public void visit(ErrorDesignatorStatementAssigmentToSemi ErrorDesignatorStatementAssigmentToSemi) { visit(); }
    public void visit(EDesignatorStatementAssigment EDesignatorStatementAssigment) { visit(); }
    public void visit(DesignatorStatementDECREMENT DesignatorStatementDECREMENT) { visit(); }
    public void visit(DesignatorStatementINCREMENT DesignatorStatementINCREMENT) { visit(); }
    public void visit(DesignatorStatementEQUAL DesignatorStatementEQUAL) { visit(); }
    public void visit(NoMatrixTypeOptional NoMatrixTypeOptional) { visit(); }
    public void visit(EMatrixTypeOptional EMatrixTypeOptional) { visit(); }
    public void visit(NoArrayTypeOptional NoArrayTypeOptional) { visit(); }
    public void visit(EArrayTypeOptional EArrayTypeOptional) { visit(); }
    public void visit(DesignatorName DesignatorName) { visit(); }
    public void visit(DesignatorNSR DesignatorNSR) { visit(); }
    public void visit(DesignatorSimple DesignatorSimple) { visit(); }
    public void visit(NoFactorMatrixTypeOptional NoFactorMatrixTypeOptional) { visit(); }
    public void visit(EFactorMatrixTypeOptional EFactorMatrixTypeOptional) { visit(); }
    public void visit(FactorNew FactorNew) { visit(); }
    public void visit(FactorDesignatorFunc FactorDesignatorFunc) { visit(); }
    public void visit(FactorDesignatorVar FactorDesignatorVar) { visit(); }
    public void visit(FactorExprInParens FactorExprInParens) { visit(); }
    public void visit(FactorBoolConst FactorBoolConst) { visit(); }
    public void visit(FactorCharConst FactorCharConst) { visit(); }
    public void visit(FactorNumConst FactorNumConst) { visit(); }
    public void visit(NoMulopFactorList NoMulopFactorList) { visit(); }
    public void visit(MultipleMulopFactorList MultipleMulopFactorList) { visit(); }
    public void visit(Term Term) { visit(); }
    public void visit(PositiveStartExpr PositiveStartExpr) { visit(); }
    public void visit(PositiveStartTermOnlyExpr PositiveStartTermOnlyExpr) { visit(); }
    public void visit(NegativeStartExpr NegativeStartExpr) { visit(); }
    public void visit(ProcCall ProcCall) { visit(); }
    public void visit(MatchedIFELSE MatchedIFELSE) { visit(); }
    public void visit(MatchedReturnNone MatchedReturnNone) { visit(); }
    public void visit(MatchedReturn MatchedReturn) { visit(); }
    public void visit(MathchedPrint MathchedPrint) { visit(); }
    public void visit(MatchedPrintSimple MatchedPrintSimple) { visit(); }
    public void visit(MatchedRead MatchedRead) { visit(); }
    public void visit(MatchedDesignatorStatement MatchedDesignatorStatement) { visit(); }
    public void visit(UnmatchedIFELSE UnmatchedIFELSE) { visit(); }
    public void visit(UnmatchedIF UnmatchedIF) { visit(); }
    public void visit(StatementUnmatched StatementUnmatched) { visit(); }
    public void visit(StatementMatched StatementMatched) { visit(); }
    public void visit(NoStatementList NoStatementList) { visit(); }
    public void visit(EStatementList EStatementList) { visit(); }
    public void visit(SingleActualParamList SingleActualParamList) { visit(); }
    public void visit(MultipleActualParamList MultipleActualParamList) { visit(); }
    public void visit(NoActualPars NoActualPars) { visit(); }
    public void visit(EActualPars EActualPars) { visit(); }
    public void visit(FormalParamDeclArr FormalParamDeclArr) { visit(); }
    public void visit(FormalParamDeclSimple FormalParamDeclSimple) { visit(); }
    public void visit(SingleFormalParamList SingleFormalParamList) { visit(); }
    public void visit(MultipleFormalParamList MultipleFormalParamList) { visit(); }
    public void visit(NoFormPars NoFormPars) { visit(); }
    public void visit(EFormPars EFormPars) { visit(); }
    public void visit(VoidMethodTypeName VoidMethodTypeName) { visit(); }
    public void visit(EMethodTypeName EMethodTypeName) { visit(); }
    public void visit(MethodDecl MethodDecl) { visit(); }
    public void visit(NoMethodDeclList NoMethodDeclList) { visit(); }
    public void visit(EMethodDeclList EMethodDeclList) { visit(); }
    public void visit(ErrorVarName ErrorVarName) { visit(); }
    public void visit(EVarName EVarName) { visit(); }
    public void visit(NoVarDeclListSingleType NoVarDeclListSingleType) { visit(); }
    public void visit(ErrorVarDeclListSingleTypeToComma ErrorVarDeclListSingleTypeToComma) { visit(); }
    public void visit(EVarDeclListSingleType EVarDeclListSingleType) { visit(); }
    public void visit(NoOptSquareBracketsMatrix NoOptSquareBracketsMatrix) { visit(); }
    public void visit(EOptSquareBracketsMatrix EOptSquareBracketsMatrix) { visit(); }
    public void visit(NoOptSquareBrackets NoOptSquareBrackets) { visit(); }
    public void visit(EOptSquareBrackets EOptSquareBrackets) { visit(); }
    public void visit(ErrorVarTypeName ErrorVarTypeName) { visit(); }
    public void visit(EVarTypeName EVarTypeName) { visit(); }
    public void visit(ErrorVarDeclToSemi ErrorVarDeclToSemi) { visit(); }
    public void visit(EVarDecl EVarDecl) { visit(); }
    public void visit(NoVarDeclList NoVarDeclList) { visit(); }
    public void visit(EVarDeclList EVarDeclList) { visit(); }
    public void visit(CName CName) { visit(); }
    public void visit(NoConstDeclListSingleType NoConstDeclListSingleType) { visit(); }
    public void visit(EConstDeclListSingleType EConstDeclListSingleType) { visit(); }
    public void visit(ConstantTypeName ConstantTypeName) { visit(); }
    public void visit(ErrorConstDeclToSemi ErrorConstDeclToSemi) { visit(); }
    public void visit(EConstDecl EConstDecl) { visit(); }
    public void visit(NoConstDeclList NoConstDeclList) { visit(); }
    public void visit(EConstDeclList EConstDeclList) { visit(); }
    public void visit(DeclVar DeclVar) { visit(); }
    public void visit(DeclConst DeclConst) { visit(); }
    public void visit(NoDeclList NoDeclList) { visit(); }
    public void visit(EDeclList EDeclList) { visit(); }
    public void visit(NamespaceName NamespaceName) { visit(); }
    public void visit(Namespace Namespace) { visit(); }
    public void visit(NoNamespaceList NoNamespaceList) { visit(); }
    public void visit(ENamespaceList ENamespaceList) { visit(); }
    public void visit(TypeNamespaceResolution TypeNamespaceResolution) { visit(); }
    public void visit(TypeSimple TypeSimple) { visit(); }
    public void visit(ProgramName ProgramName) { visit(); }
    public void visit(Program Program) { visit(); }


    public void visit() { }
}
