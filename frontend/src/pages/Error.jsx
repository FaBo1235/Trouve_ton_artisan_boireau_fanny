import React from "react";


export default function Error() {
  return (
    <div className="text-center py-20">
      <h1 className="text-3xl text-blue-700 font-bold">Aucun résultat trouvé</h1>
      <p className="text-gray-600 mt-2">
        Essayez un autre mot clé ou une orthographe différente.
      </p>
    </div>
  );
}