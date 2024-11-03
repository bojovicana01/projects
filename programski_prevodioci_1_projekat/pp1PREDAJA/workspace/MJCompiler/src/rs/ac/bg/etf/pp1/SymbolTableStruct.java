package rs.ac.bg.etf.pp1;

import rs.etf.pp1.symboltable.concepts.Struct;
import rs.etf.pp1.symboltable.structure.SymbolDataStructure;

public class SymbolTableStruct extends Struct {
	
	public static final int Namespace = 7;

	public SymbolTableStruct(int kind) {
		super(kind);
	}
	
	public SymbolTableStruct(int kind, Struct elemType) {
		super(kind, elemType);
	}

	public SymbolTableStruct(int kind, SymbolDataStructure members) {
		super(kind, members);
	}

}
