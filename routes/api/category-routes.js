const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const catData = await Category.findAll({
      include: [{ model: Product }],
    })
    .then((catData) => {
      res.status(200).json(catData);
    })
  }
  catch (err){
    res.status(500).json(err);
  } 
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const oneCatData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    })
    if (!oneCatData) {
      res.status(404).json({ message: 'No category found with this id.' });
      return;
    }
    res.status(200).json(oneCatData);
  }
  catch (err){
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body).then((newCategory) => {
    res.json(newCategory);
  })
  .catch((err) => {
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    }
  }).then((updatedCategory) => {
    res.status(200).json(updatedCategory);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    }
  })
  .then((deletedCategory) => {
    res.status(200).json({message: 'Category deleted.'})
  })
  .catch((err) => res.json(err))
});

module.exports = router;
