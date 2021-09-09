require("dotenv").config();

const yup = require("yup");
const { nanoid } = require("nanoid");
const path = require("path");

const app = require("./app.js");

const {
  apolloClient,
  getUrlQuery,
  getAllUrls,
  addUrl,
} = require("./apollo.js");

const urlSchema = yup.object().shape({
  slug: yup
    .string()
    .trim()
    .matches(/[\w\-]/),
  url: yup.string().trim().url().required(),
});

app.get("/urls", async (req, res) => {
  try {
    const data = await apolloClient.request(getAllUrls);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const variables = {
      slug,
    };

    const data = await apolloClient.request(getUrlQuery, variables);
    const { urls } = data;

    res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/url", async (req, res) => {
  let { slug, url } = req.body;

  try {
    await urlSchema.validate({
      url,
      slug,
    });

    if (!slug) {
      slug = nanoid();
    }

    slug = slug.toLowerCase();

    const variables = {
      url,
      slug,
    };

    const data = await apolloClient.request(addUrl, variables);
    res.status(200).json(data);
  } catch (error) {
    if (error.message.startsWith("Uniqueness violation")) {
      return res.status(400).json({ message: "Slug already is being used" });
    }
    res.status(400).json({
      error: error.name,
      message: error.errors ? error.errors.join("\n") : "Internal Server Error",
    });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client_url_shortener/dist", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
