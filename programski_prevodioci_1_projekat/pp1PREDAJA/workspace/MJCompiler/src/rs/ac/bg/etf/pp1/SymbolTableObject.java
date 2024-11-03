package rs.ac.bg.etf.pp1;

import rs.etf.pp1.symboltable.concepts.Obj;
import rs.etf.pp1.symboltable.concepts.Struct;

public class SymbolTableObject extends Obj {
	
	public static final int Namespace = 7;
	
	public SymbolTableObject(int kind, String name, Struct type) {
		super(kind, name, type, NO_VALUE, NO_VALUE);
	}
	
	public SymbolTableObject(int kind, String name, Struct type, int adr, int level) {
		super(kind, name, type, adr, level);
	}

}
