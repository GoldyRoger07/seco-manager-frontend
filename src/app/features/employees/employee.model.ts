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
        public departement ?: Departement,
        public departementId?: number,
        public position ?:Position,
        public positionId?: number,
        public etatCivil ?:EtatCivil,
        public etatCivilId?: number,
        public typeConge?:TypeConge,
        public typeCongeId?: number,
        public banque? :Banque,
        public banqueId?: number,
        public numCompteBancaire = ""
    ){}
}

export interface EmployeeForm{
  id: number
  idEmployee: string
  nom: string
  prenom: string
  dateNaissance: Date
  dateEmbauche: Date
  sexe: 'MASCULIN'|'FEMININ'
  salaire: number
  nif: string
  adresse: string
  telephone: string
  nombreEnfant: number
  departementId: number
  banqueId: number
  positionId: number
  etatCivilId: number
  typeCongeId: number,
  numCompteBancaire: string
}