const express = require('express')
const app = express()
const cors = require('cors')


app.use(cors())
app.use(express.json())

app.post('/', (req,res) => {
    function matrixDot (A, B) {
        var result = new Array(A.length).fill(0).map(row => new Array(B[0].length).fill(0));
    
        return result.map((row, i) => {
            return row.map((val, j) => {
                return A[i].reduce((sum, elm, k) => sum + (elm*B[k][j]) ,0)
            })
        })
    }
    const data = req.body.data
    let a1 = parseInt(data.a1)/100
    let a2 = parseInt(data.a2)/100
    let a3 = parseInt(data.a3)/100
    let b1 = parseInt(data.b1)/100
    let b2 = parseInt(data.b2)/100
    let b3 = parseInt(data.b3)/100
    let c1 = parseInt(data.c1)/100
    let c2 = parseInt(data.c2)/100
    let c3 = parseInt(data.c3)/100
    let tnum = parseInt(data.tnum)
    let valA = parseInt(data.valA)
    let valB = parseInt(data.valB)
    let valC = parseInt(data.valC)

    let i
    let m1 = [[a1,b1,c1],[a2,b2,c2], [a3,b3,c3]]
    let mp = m1
    let m2 = [[valA],[valB],[valC]]
    
    for (i=1; i < tnum; i++){
        mp = matrixDot(mp,m1)
    }
    
    let result = matrixDot(mp,m2)

    data.valA = Math.round(result[0][0])
    data.valB = Math.round(result[1][0])
    data.valC = Math.round(result[2][0])

    res.json(data)

})

app.post('/final', (req,res) => {

    const data = req.body.data
    let a1 = parseInt(data.a1)/100
    let a2 = parseInt(data.a2)/100
    let b1 = parseInt(data.b1)/100
    let b2 = parseInt(data.b2)/100
    let c1 = parseInt(data.c1)/100
    let c2 = parseInt(data.c2)/100
    let valA = parseInt(data.valA)
    let valB = parseInt(data.valB)
    let valC = parseInt(data.valC)
    let total = valA + valB + valC

    let x = (1-a1-b2+(a1*b2) -(b1*a2))/((c1*a2)+c2-(c2*a1))
    let B = (1-a1)/(1+b1+x-a1-(x*a1)+(x*c1))
    let C = x*B
    let A = 1-B-C
        
    
    data.valA = Math.round(A * total)
    data.valB = Math.round(B * total)
    data.valC = Math.round(C * total)

    res.json(data)

})





app.listen(8080, () => {
    console.log('Server is running...')
})