const detailService = require('../services/detail');

async function index(req, res) {
  
  try {
      const { province, area, id } = req.params;

      if (!Number.isInteger(Number(id))) {
        return res.status(404).render("404");
      }

      const profile = await detailService.getProfileById(
        id,
        province,
        area
      );

      if (!profile) {
        return res.status(404).render("404");
      }

      const relatedProfiles = await detailService.getRelatedProfiles(profile);

      detailService.increaseViews(id).catch(console.error);
      
      res.render("detail", {
        profile,
        province,
        area,
        relatedProfiles
      });

  } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
  }

}

module.exports = {
  index
};