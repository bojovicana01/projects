// generated with ast extension for cup
// version 0.8
// 26/7/2024 12:17:52


package rs.ac.bg.etf.pp1.ast;

public interface Visitor { 

    public void visit(Unmatched Unmatched);
    public void visit(Mulop Mulop);
    public void visit(Constant Constant);
    public void visit(Matched Matched);
    public void visit(Relop Relop);
    public void visit(ArrayTypeOptional ArrayTypeOptional);
    public void visit(MatrixTypeOptional MatrixTypeOptional);
    public void visit(Assignop Assignop);
    public void visit(MulopFactorList MulopFactorList);
    public void visit(FormalParamDecl FormalParamDecl);
    public void visit(Bitop Bitop);
    public void visit(VarName VarName);
    public void visit(StatementList StatementList);
    public void visit(NamespaceList NamespaceList);
    public void visit(Addop Addop);
    public void visit(OptSquareBrackets OptSquareBrackets);
    public void visit(Factor Factor);
    public void visit(VarDeclListSingleType VarDeclListSingleType);
    public void visit(DeclList DeclList);
    public void visit(Designator Designator);
    public void visit(FactorMatrixTypeOptional FactorMatrixTypeOptional);
    public void visit(VarTypeName VarTypeName);
    public void visit(ConstDeclListSingleType ConstDeclListSingleType);
    public void visit(ConstDeclList ConstDeclList);
    public void visit(ActualParamList ActualParamList);
    public void visit(VarDeclList VarDeclList);
    public void visit(FormalParamList FormalParamList);
    public void visit(Expr Expr);
    public void visit(MethodTypeName MethodTypeName);
    public void visit(DesignatorStatement DesignatorStatement);
    public void visit(DesignatorStatementAssigment DesignatorStatementAssigment);
    public void visit(ActualPars ActualPars);
    public void visit(Decl Decl);
    public void visit(Unaryop Unaryop);
    public void visit(Statement Statement);
    public void visit(VarDecl VarDecl);
    public void visit(Type Type);
    public void visit(ConstDecl ConstDecl);
    public void visit(MethodDeclList MethodDeclList);
    public void visit(FormPars FormPars);
    public void visit(OptSquareBracketsMatrix OptSquareBracketsMatrix);
    public void visit(AddopTermList AddopTermList);
    public void visit(CharConst CharConst);
    public void visit(BoolConst BoolConst);
    public void visit(NumConst NumConst);
    public void visit(CCharConst CCharConst);
    public void visit(CBoolConst CBoolConst);
    public void visit(CNumConst CNumConst);
    public void visit(BitwiseOr BitwiseOr);
    public void visit(BitwiseAnd BitwiseAnd);
    public void visit(Decrement Decrement);
    public void visit(Increment Increment);
    public void visit(Percent Percent);
    public void visit(Slash Slash);
    public void visit(Times Times);
    public void visit(Minus Minus);
    public void visit(Plus Plus);
    public void visit(LessThanOrEqual LessThanOrEqual);
    public void visit(LessThan LessThan);
    public void visit(GreaterThanOrEqual GreaterThanOrEqual);
    public void visit(GreaterThan GreaterThan);
    public void visit(Differs Differs);
    public void visit(Equals Equals);
    public void visit(Equal Equal);
    public void visit(ErrorDesignatorStatementAssigmentToSemi ErrorDesignatorStatementAssigmentToSemi);
    public void visit(EDesignatorStatementAssigment EDesignatorStatementAssigment);
    public void visit(DesignatorStatementDECREMENT DesignatorStatementDECREMENT);
    public void visit(DesignatorStatementINCREMENT DesignatorStatementINCREMENT);
    public void visit(DesignatorStatementEQUAL DesignatorStatementEQUAL);
    public void visit(NoMatrixTypeOptional NoMatrixTypeOptional);
    public void visit(EMatrixTypeOptional EMatrixTypeOptional);
    public void visit(NoArrayTypeOptional NoArrayTypeOptional);
    public void visit(EArrayTypeOptional EArrayTypeOptional);
    public void visit(DesignatorName DesignatorName);
    public void visit(DesignatorNSR DesignatorNSR);
    public void visit(DesignatorSimple DesignatorSimple);
    public void visit(NoFactorMatrixTypeOptional NoFactorMatrixTypeOptional);
    public void visit(EFactorMatrixTypeOptional EFactorMatrixTypeOptional);
    public void visit(FactorNew FactorNew);
    public void visit(FactorDesignatorFunc FactorDesignatorFunc);
    public void visit(FactorDesignatorVar FactorDesignatorVar);
    public void visit(FactorExprInParens FactorExprInParens);
    public void visit(FactorBoolConst FactorBoolConst);
    public void visit(FactorCharConst FactorCharConst);
    public void visit(FactorNumConst FactorNumConst);
    public void visit(NoMulopFactorList NoMulopFactorList);
    public void visit(MultipleMulopFactorList MultipleMulopFactorList);
    public void visit(Term Term);
    public void visit(PositiveStartExpr PositiveStartExpr);
    public void visit(PositiveStartTermOnlyExpr PositiveStartTermOnlyExpr);
    public void visit(NegativeStartExpr NegativeStartExpr);
    public void visit(ProcCall ProcCall);
    public void visit(MatchedIFELSE MatchedIFELSE);
    public void visit(MatchedReturnNone MatchedReturnNone);
    public void visit(MatchedReturn MatchedReturn);
    public void visit(MathchedPrint MathchedPrint);
    public void visit(MatchedPrintSimple MatchedPrintSimple);
    public void visit(MatchedRead MatchedRead);
    public void visit(MatchedDesignatorStatement MatchedDesignatorStatement);
    public void visit(UnmatchedIFELSE UnmatchedIFELSE);
    public void visit(UnmatchedIF UnmatchedIF);
    public void visit(StatementUnmatched StatementUnmatched);
    public void visit(StatementMatched StatementMatched);
    public void visit(NoStatementList NoStatementList);
    public void visit(EStatementList EStatementList);
    public void visit(SingleActualParamList SingleActualParamList);
    public void visit(MultipleActualParamList MultipleActualParamList);
    public void visit(NoActualPars NoActualPars);
    public void visit(EActualPars EActualPars);
    public void visit(FormalParamDeclArr FormalParamDeclArr);
    public void visit(FormalParamDeclSimple FormalParamDeclSimple);
    public void visit(SingleFormalParamList SingleFormalParamList);
    public void visit(MultipleFormalParamList MultipleFormalParamList);
    public void visit(NoFormPars NoFormPars);
    public void visit(EFormPars EFormPars);
    public void visit(VoidMethodTypeName VoidMethodTypeName);
    public void visit(EMethodTypeName EMethodTypeName);
    public void visit(MethodDecl MethodDecl);
    public void visit(NoMethodDeclList NoMethodDeclList);
    public void visit(EMethodDeclList EMethodDeclList);
    public void visit(ErrorVarName ErrorVarName);
    public void visit(EVarName EVarName);
    public void visit(NoVarDeclListSingleType NoVarDeclListSingleType);
    public void visit(ErrorVarDeclListSingleTypeToComma ErrorVarDeclListSingleTypeToComma);
    public void visit(EVarDeclListSingleType EVarDeclListSingleType);
    public void visit(NoOptSquareBracketsMatrix NoOptSquareBracketsMatrix);
    public void visit(EOptSquareBracketsMatrix EOptSquareBracketsMatrix);
    public void visit(NoOptSquareBrackets NoOptSquareBrackets);
    public void visit(EOptSquareBrackets EOptSquareBrackets);
    public void visit(ErrorVarTypeName ErrorVarTypeName);
    public void visit(EVarTypeName EVarTypeName);
    public void visit(ErrorVarDeclToSemi ErrorVarDeclToSemi);
    public void visit(EVarDecl EVarDecl);
    public void visit(NoVarDeclList NoVarDeclList);
    public void visit(EVarDeclList EVarDeclList);
    public void visit(CName CName);
    public void visit(NoConstDeclListSingleType NoConstDeclListSingleType);
    public void visit(EConstDeclListSingleType EConstDeclListSingleType);
    public void visit(ConstantTypeName ConstantTypeName);
    public void visit(ErrorConstDeclToSemi ErrorConstDeclToSemi);
    public void visit(EConstDecl EConstDecl);
    public void visit(NoConstDeclList NoConstDeclList);
    public void visit(EConstDeclList EConstDeclList);
    public void visit(DeclVar DeclVar);
    public void visit(DeclConst DeclConst);
    public void visit(NoDeclList NoDeclList);
    public void visit(EDeclList EDeclList);
    public void visit(NamespaceName NamespaceName);
    public void visit(Namespace Namespace);
    public void visit(NoNamespaceList NoNamespaceList);
    public void visit(ENamespaceList ENamespaceList);
    public void visit(TypeNamespaceResolution TypeNamespaceResolution);
    public void visit(TypeSimple TypeSimple);
    public void visit(ProgramName ProgramName);
    public void visit(Program Program);

}
