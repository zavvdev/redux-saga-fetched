export function Book({ title, author, price }) {
  return (
    <div className="border rounded-lg px-4 py-2">
      <h2 className="text-lg font-bold">{title}</h2>
      <p>{author}</p>
      <i>{price}</i>
    </div>
  );
}
