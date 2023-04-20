const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    })
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const oneTagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    })
    if (!oneTagData) {
      res.status(404).json({ message: 'No tag found with this id.' });
    }
    res.status(200).json(oneTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((newTag) => {
      res.status(200).json(newTag);
    })
  .catch((err) => json(err));
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
 Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then((updatedTag) => {
    res.json(updatedTag);
  })
  .catch((err) => json(err));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    }
  })
  .then((deletedTag) => {
    res.status(200).json({message: 'Tag deleted successfully.'});
  })
  .catch((err) => res.json(err));
});

module.exports = router;
