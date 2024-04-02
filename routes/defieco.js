const express = require('express')
const router  = express.Router()
const Defieco = require('../models/defieco')

//get multiple challenges
router.get('/', async (req, res) => {
    try {
        const defieco = await Defieco.find()
        res.json(defieco)
    }catch (err) {
        res.status(500).json({ message: err.message})
    }
})

//get one challenge
router.get('/:id', getDefieco, (req, res) => {
    res.json(res.defieco)
})

//add one challenge
router.post('/', async (req, res) => {
    const defieco = new Defieco({
        name: req.body.name,
        description: req.body.description
    })
    try{
        const newDefieco = await defieco.save()
        res.status(201).json(newDefieco)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})

//update one challenge
router.patch('/:id', getDefieco , async (req, res) => {
    if (req.body.name != null) {
        res.defieco.name = req.body.name
    }
    if (req.body.description != null) {
        res.defieco.description = req.body.description
    }
    try {
        const updatedDefieco = await res.defieco.save()
        res.json(updatedDefieco)
    } catch (error) {
        res.status(400).json({message: err.message})
    }
})

//delete one challenge
router.delete('/:id', getDefieco , async (req, res) => {
    try {
        await res.deifeco.remove()
        res.json({message: 'Deleted Challenge'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

async function getDefieco(req, res, next){
    let defieco
    try{
        defieco = await Defieco.findById(req.params.id)
        if (defieco == null){
            return res.status(404).json({message: "Cannot find challenge"})
        } 
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.defieco = defieco
    next()
}

module.exports = router 