db.createCollection('utilisateurs', {
  validator: {
    $jsonSchema: {
      required: ['nom', 'prenom', 'adresse_e-mail', 'mot_de_passe'],
      properties: {
        _id: { bsonType: 'objectId' },
        nom: { bsonType: 'string' },
        prenom: { bsonType: 'string' },
        adresse_e_mail: { bsonType: 'string', format: 'email' },
        mot_de_passe: { bsonType: 'string' },
        numero_de_telephone: { bsonType: ['string', 'null'] },
        adresse: { bsonType: ['string', 'null'] },
        date_de_naissance: { bsonType: 'date', 'optional': true },
        sexe: { bsonType: ['string', 'null'] },
        type_compte: { bsonType: 'string', enum: ['client', 'admin'] }
      }
    }
  }
});
