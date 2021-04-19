//type def mirip model di sequlize bisa jadi sebagai validasi bentuk model dari resolver juga
const { gql } = require('apollo-server');
module.exports=  gql`

  type Series {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    series: [Series]
    getOneSeries(id : ID): Series
  }

  input OneSeries {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: String
  }

  input OneSeriesPlusId {
    id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: String
  }


  extend type Mutation {
      addSerie(post:OneSeries): Series
      updateSerie(put:OneSeriesPlusId): Message
      deleteSerie(id:ID): Message
  }
`;
