
package rs.ac.bg.etf.pp1;

import java_cup.runtime.Symbol;

%%

%{

	// ukljucivanje informacije o poziciji tokena
	private Symbol new_symbol(int type) {
		return new Symbol(type, yyline+1, yycolumn);
	}
	
	// ukljucivanje informacije o poziciji tokena
	private Symbol new_symbol(int type, Object value) {
		return new Symbol(type, yyline+1, yycolumn, value);
	}

%}

%cup
%line
%column

%xstate COMMENT

%eofval{
	return new_symbol(sym.EOF);
%eofval}

%%

" " 	{ }
"\b" 	{ }
"\t" 	{ }
"\r\n" 	{ }
"\f" 	{ }

"program"   	{ return new_symbol(sym.PROG, yytext());}
"print" 		{ return new_symbol(sym.PRINT, yytext()); }
"read" 			{ return new_symbol(sym.READ, yytext()); }
"return" 		{ return new_symbol(sym.RETURN, yytext()); }
"void" 			{ return new_symbol(sym.VOID, yytext()); }
"const" 		{ return new_symbol(sym.CONST, yytext()); }
"new" 			{ return new_symbol(sym.NEW, yytext()); }
"namespace" 	{ return new_symbol(sym.NAMESPACE, yytext()); }

"+" 		{ return new_symbol(sym.PLUS, yytext()); }
"-" 		{ return new_symbol(sym.MINUS, yytext()); }
"*" 		{ return new_symbol(sym.TIMES, yytext()); }
"/" 		{ return new_symbol(sym.SLASH, yytext()); }
"%" 		{ return new_symbol(sym.PERCENT, yytext()); }
"&&" 		{ return new_symbol(sym.BITWISEAND, yytext()); }
"||" 		{ return new_symbol(sym.BITWISEOR, yytext()); }
"++" 		{ return new_symbol(sym.INCREMENT, yytext()); }
"--" 		{ return new_symbol(sym.DECREMENT, yytext()); }

"=" 		{ return new_symbol(sym.EQUAL, yytext()); }
"==" 		{ return new_symbol(sym.EQUALS, yytext()); }
"!=" 		{ return new_symbol(sym.DIFFERS, yytext()); }
">" 		{ return new_symbol(sym.GREATERTHAN, yytext()); }
">=" 		{ return new_symbol(sym.GREATERTHANOREQUAL, yytext()); }
"<" 		{ return new_symbol(sym.LESSTHAN, yytext()); }
"<=" 		{ return new_symbol(sym.LESSTHANOREQUAL, yytext()); }

";" 		{ return new_symbol(sym.SEMI, yytext()); }
":" 		{ return new_symbol(sym.COLON, yytext()); }
"," 		{ return new_symbol(sym.COMMA, yytext()); }

"(" 		{ return new_symbol(sym.LPAREN, yytext()); }
")" 		{ return new_symbol(sym.RPAREN, yytext()); }
"{" 		{ return new_symbol(sym.LBRACE, yytext()); }
"}"			{ return new_symbol(sym.RBRACE, yytext()); }
"[" 		{ return new_symbol(sym.LSQUAREBRACKET, yytext()); }
"]" 		{ return new_symbol(sym.RSQUAREBRACKET, yytext()); }

"//" 			 {yybegin(COMMENT);}
<COMMENT> . 	 {yybegin(COMMENT);}
<COMMENT> "\r\n" { yybegin(YYINITIAL); }

"true"|"false" 			{ return new_symbol(sym.BOOLEAN, yytext().equals("true") ? Boolean.TRUE : Boolean.FALSE); }
[0-9]+  				{ return new_symbol(sym.NUMBER, Integer.parseInt(yytext())); }
[a-zA-Z][a-zA-Z0-9_]* 	{return new_symbol (sym.IDENT, yytext()); }
"'"."'" 				{ return new_symbol(sym.CHARACTER, yytext().charAt(1)); }

. { System.err.println("Leksicka greska ("+yytext()+") u liniji "+(yyline+1)+" u koloni "+(yycolumn+1)); }










