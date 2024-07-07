import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    res.json(await Category.find());
  }

  if (method === "POST") {
    const { name, parentCategory } = req.body;
    const categoryDoc = await Category.create({
      name,
      parent: parentCategory,
    });
    res.json(categoryDoc);
  }

  if (method === "PUT") {
    const { _id, name } = req.body;
    const editCat = await Category.updateOne({ _id }, { name });
    res.json(editCat);
  }
  if (method === "DELETE") {
    const {_id} = req.query
      await Category.deleteOne({ _id });
      res.json(true)
  }
}
