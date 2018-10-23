const fetch = require('node-fetch');//to be able to create a client

const express = require('express')
const app = express()

app.set('view engine', 'ejs')

const SPARQL_QUERY_URL = process.env.SPARQL_QUERY_URL || 'http://localhost:8889/bigdata/sparql?query='

console.log("URL set to: " + SPARQL_QUERY_URL)

var query = encodeURIComponent(`prefix owl: <http://www.w3.org/2002/07/owl#>
prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
prefix ns: <http://www.example.org/myexample#>


    SELECT ?labels ?iri
        WHERE {
    ?iri rdfs:label ?labels ;
        rdfs:subClassOf*/rdf:type ns:clothing_material .
}`)

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/graph', (req, res) => {
    fetch(SPARQL_QUERY_URL + query, {headers: {"Accept":"application/sparql-results+json"}})
.then(res2 => res2.json())
.then(body => {
    var bindings = body.results.bindings
    var results = []
    bindings.forEach((binding) => {
    results.push({"label": binding.labels.value, "iri": binding.iri.value})
})
    //res.send(results)
    res.render('graph', {title: "My great graph!", params: results})
});
})

app.get('/entity', (req, res) => {
    var iri = req.query.iri

    var query2 = encodeURIComponent(`
    SELECT ?p ?o
        WHERE {
            <${iri}> ?p ?o .
        }
    `)

    fetch(SPARQL_QUERY_URL + query2, {headers: {"Accept": "application/sparql-results+json"}})
        .then(res2 => res2.json())
        .then(body => {
            var bindings = body.results.bindings
            var results = []
            bindings.forEach((binding) => {
                results.push({"p": binding.p.value, "o": binding.o.value})
            })
            res.send(results)
        })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))