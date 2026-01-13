import { Banque } from "../banques/banque.model";
import { Departement } from "../departements/departement.model";
import { EtatCivil } from "../etat-civils/etat-civil.model";
import { Position } from "../positions/position.model";
import { TypeConge } from "../type-conge/type-conge.model";

export class Employee{
    constructor(
        public id = 0,
        public idEmployee = "",
        public nom = "",
        public prenom = "",
        public dateNaissance = new Date(),
        public dateEmbauche = new Date(),
        public sexe: 'MASCULIN'|'FEMININ' = "MASCULIN",
        public salaire = 0,
        public nif = "",
        public adresse = "",
        public telephone = "",
        public nombreEnfant = 0,
        public departement = new Departement(),
        public position = new Position(),
        public etatCivil = new EtatCivil(),
        public typeConge = new TypeConge(),
        public banque = new Banque(),
        public numCompteBancaire = ""
    ){}
}