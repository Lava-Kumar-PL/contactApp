const { Router } = require('express');
const router = Router();
const contactSchema = require('../models/contactSchema');

router.get('/list', async (req, res) => {
    try {
        const contactsList = await contactSchema.find().lean()
        res.render('contact/contactList', { title: 'Contact List', contactsList });
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
})

router.get('/addContact', (req, res) => {
    res.render('contact/addContact', {
        title: "Add Contact",
    })
})

router.post('/addContact', async (req, res) => {
    await contactSchema.create(req.body)
    res.redirect('/contact/list', 307, { success: true, message: "contact added" })
})

router.get('/edit/:id', async (req, res) => {
    let editcontact = await contactSchema.findOne({_id:req.params.id}).lean()
    res.render('contact/editContact',{title:"Edit Contact",editcontact})
})

router.post('/edit/:id', async (req, res) => {
    try {
        let updatedData= {
            firstName:req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address
        }
        await contactSchema.findByIdAndUpdate(req.params.id, updatedData, { new: true })
   res.redirect('/contact/list', 307, { success: true, message: "contact edited" })
    } catch (error) {
        console.log(error)
          
    } 
})

router.get('/delete/:id', async (req,res)=>{
    await contactSchema.findByIdAndDelete(req.params.id)
    res.redirect('/contact/list', 307, { success: true, message: "contact deleted" })
})

router.post('/search', async (req,res)=>{
let user = req.body.search.trim(); // Remove extra spaces
let field = req.body.field;
let contactsList = "";

if (field === 'Name') {
    if (user.includes(" ")) {
        let userarr = user.split(" ");
        let combinations = [];

        // Generate combinations for first and last name from any split point
        for (let i = 1; i <= userarr.length; i++) {
            let firstName=""
            let lastName=""
            firstName = userarr.slice(0, i).join(" ");
            lastName = userarr.slice(i).join(" ");
            
            // Push valid combinations (non-empty first and last names)
            if (firstName || lastName) {
                combinations.push({ firstName, lastName });
                combinations.push({ firstName: lastName, lastName: firstName }); // Reverse for flexibility
            }
        }

        // Prepare a query array for all combinations
        let query = combinations.map(combo => (
            {
            $or: [
                { firstName: { $regex: new RegExp(combo.firstName, "i") }, lastName: { $regex: new RegExp(combo.lastName, "i") } },
                { firstName: { $regex: new RegExp(combo.lastName, "i") }, lastName: { $regex: new RegExp(combo.firstName, "i") } }
            ]
        }
    ));
        

        // Perform the query using $or to check all combinations
        contactsList = await contactSchema.find({ $or: query }).lean();
    } else {
        // If only one word is provided, search in both first and last name fields
        contactsList = await contactSchema.find({
            $or: [
                { firstName: { $regex: new RegExp(user, "i") } },
                { lastName: { $regex: new RegExp(user, "i") } }
            ]
        }).lean();
        
    }
}

 
    else if (field === "email") {
    // Partial match for email (case-insensitive)
    contactsList = await contactSchema.find({ 
        email: { $regex: new RegExp(user, "i") } 
    }).lean();
} else if (field === "MobileNo") {
    // Partial match for mobile number
    contactsList = await contactSchema.find({ 
        phoneNumber: { $regex: new RegExp(user, "i") } 
    }).lean();
}
    let fullList = true
    res.render('contact/contactList', { title: 'Contact List', contactsList,fullList });

})

module.exports = router;