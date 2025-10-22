import { Model, Document } from "mongoose";

export async function generateCustomId<T extends Document>(
  Model: Model<T>,
  idField: string,
  prefix: string
): Promise<string> {
  try {
    // Determine pad length based on model name
    const modelName = Model.modelName;
    let padLength = 4; // default
    if (modelName === "MenuProducts" || modelName === "CustomerOrder") padLength = 5;

    // Fetch records sorted by idField
    const records = await Model.find({}, { [idField]: 1, _id: 0 }).sort({
      [idField]: 1,
    });

    // Extract numeric parts from IDs, removing prefix
    const ids = records
      .map((record) => {
        const rawId = (record as any)[idField];
        return rawId ? parseInt(rawId.replace(prefix, ""), 10) : null;
      })
      .filter((id): id is number => id !== null && !isNaN(id));

    // Generate the next available ID
    let newId = 1;
    for (let i = 0; i < ids.length; i++) {
      if (newId < ids[i]) break;
      newId++;
    }

    // Return prefix + zero-padded number
    return `${prefix}${String(newId).padStart(padLength, "0")}`;
  } catch (error) {
    console.error("Error generating custom ID:", error);
    throw new Error("Unable to generate custom ID");
  }
}
