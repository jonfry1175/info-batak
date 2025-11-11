import { Gallery } from '@/components/ui/Gallery';
import {
  getAllDishes,
  getAllDrinks,
  getCeremonialFoods,
  getKulinerData,
  getImagesByCategory,
} from '@/lib/data';

export default function KulinerPage() {
  const dishes = getAllDishes();
  const drinks = getAllDrinks();
  const ceremonialFoods = getCeremonialFoods();
  const kulinerData = getKulinerData();

  // Get images for gallery
  const kulinerImages = getImagesByCategory('Budaya', 'Kuliner');

  // Group dishes by category
  const mainDishes = dishes.filter(d => d.category === 'main_dish');
  const appetizers = dishes.filter(d => d.category === 'appetizer');
  const soups = dishes.filter(d => d.category === 'soup');

  return (
    <div className="w-full px-4 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <h1 className="text-accent mb-6 text-4xl font-bold md:text-5xl">
          Kuliner Tradisional Batak
        </h1>
        <p className="text-foreground/70 mb-12 text-lg leading-relaxed">
          Kuliner Batak terkenal dengan cita rasa yang kuat, kaya rempah, dan unik. Penggunaan
          <span className="font-semibold"> andaliman</span> (merica Batak) memberikan sensasi
          kesemutan yang khas. Setiap hidangan tidak hanya lezat, tetapi juga sarat dengan makna
          budaya dan filosofi kehidupan masyarakat Batak.
        </p>

        {/* Signature Dishes Grid */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Hidangan Utama</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {mainDishes.map(dish => (
              <div key={dish.id} className="bg-foreground/5 overflow-hidden rounded-lg">
                <div className="p-6">
                  <h3 className="text-accent mb-2 text-2xl font-semibold">{dish.name}</h3>
                  {dish.alternateName && (
                    <p className="text-foreground/60 mb-4 text-sm italic">{dish.alternateName}</p>
                  )}
                  <p className="text-foreground/70 mb-4 leading-relaxed">{dish.description}</p>

                  <div className="mb-4">
                    <h4 className="text-accent mb-2 text-sm font-semibold">Rasa:</h4>
                    <p className="text-foreground/70 text-sm">{dish.taste}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-accent mb-2 text-sm font-semibold">Bahan Utama:</h4>
                    <div className="flex flex-wrap gap-2">
                      {dish.mainIngredients.slice(0, 5).map((ingredient, idx) => (
                        <span
                          key={idx}
                          className="bg-accent/20 text-accent rounded-full px-3 py-1 text-xs"
                        >
                          {ingredient}
                        </span>
                      ))}
                      {dish.mainIngredients.length > 5 && (
                        <span className="text-foreground/60 text-xs">
                          +{dish.mainIngredients.length - 5} lainnya
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="bg-accent/10 rounded p-4">
                    <h4 className="text-accent mb-1 text-sm font-semibold">Makna Budaya:</h4>
                    <p className="text-foreground/80 text-sm">{dish.significance}</p>
                  </div>

                  {dish.culturalNote && (
                    <div className="mt-4">
                      <p className="text-foreground/70 text-sm italic">"{dish.culturalNote}"</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Appetizers & Soups */}
        {appetizers.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-bold">Hidangan Pembuka & Sayur</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {[...appetizers, ...soups].map(dish => (
                <div key={dish.id} className="bg-foreground/5 rounded-lg p-6">
                  <h3 className="text-accent mb-2 text-xl font-semibold">{dish.name}</h3>
                  <p className="text-foreground/70 mb-4 text-sm leading-relaxed">
                    {dish.description}
                  </p>
                  <div className="bg-accent/10 rounded p-3">
                    <p className="text-foreground/80 text-xs">
                      <span className="font-semibold">Rasa:</span> {dish.taste}
                    </p>
                  </div>
                  {dish.healthNote && (
                    <p className="text-foreground/60 mt-3 text-xs italic">💡 {dish.healthNote}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Andaliman Highlight */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Andaliman: Rempah Khas Batak</h2>
          <div className="bg-accent/10 border-accent rounded-lg border-l-4 p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <h3 className="text-accent mb-3 text-2xl font-semibold">
                  {kulinerData.ingredients.andaliman.name}
                </h3>
                <p className="text-foreground/80 mb-4 leading-relaxed">
                  {kulinerData.ingredients.andaliman.description}
                </p>
                <div className="mb-4">
                  <h4 className="text-accent mb-2 text-sm font-semibold">Karakteristik Rasa:</h4>
                  <p className="text-foreground/70 text-sm">
                    {kulinerData.ingredients.andaliman.taste}
                  </p>
                </div>
                <div className="bg-foreground/5 rounded p-4">
                  <h4 className="text-accent mb-2 text-sm font-semibold">Penggunaan:</h4>
                  <p className="text-foreground/80 text-sm">
                    {kulinerData.ingredients.andaliman.usage}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="bg-foreground/5 rounded-lg p-4 text-center">
                  <p className="text-accent mb-2 text-sm font-semibold">Nama Ilmiah</p>
                  <p className="text-foreground/70 text-xs italic">
                    {kulinerData.ingredients.andaliman.scientificName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tuak Section */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Tuak: Minuman Sakral Batak</h2>
          {drinks
            .filter(drink => drink.id === 'tuak')
            .map(drink => (
              <div key={drink.id} className="bg-foreground/5 rounded-lg p-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="text-accent mb-4 text-2xl font-semibold">{drink.name}</h3>
                    <p className="text-foreground/70 mb-6 leading-relaxed">{drink.description}</p>

                    <div className="mb-4">
                      <h4 className="text-accent mb-2 text-sm font-semibold">Proses Pembuatan:</h4>
                      <p className="text-foreground/70 text-sm">{drink.process}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-background rounded p-3">
                        <p className="text-accent mb-1 text-xs font-semibold">Rasa</p>
                        <p className="text-foreground/70 text-xs">{drink.taste}</p>
                      </div>
                      <div className="bg-background rounded p-3">
                        <p className="text-accent mb-1 text-xs font-semibold">Kadar Alkohol</p>
                        <p className="text-foreground/70 text-xs">{drink.alcoholContent}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-accent mb-3 text-lg font-semibold">Peran Budaya</h4>
                    <div className="space-y-3">
                      {drink.culturalRole?.map((role, idx) => (
                        <div key={idx} className="bg-accent/10 flex items-start rounded p-3">
                          <span className="text-accent mr-2">•</span>
                          <span className="text-foreground/80 text-sm">{role}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-accent/10 mt-6 rounded p-4">
                      <h4 className="text-accent mb-2 text-sm font-semibold">Tradisi:</h4>
                      <p className="text-foreground/80 text-sm italic">{drink.tradition}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </section>

        {/* Ceremonial Foods */}
        {ceremonialFoods.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-bold">Makanan Upacara Adat</h2>
            <p className="text-foreground/70 mb-8 leading-relaxed">
              Makanan tertentu memiliki peran khusus dalam upacara adat Batak, melambangkan
              berbagi berkat dan kebersamaan.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {ceremonialFoods.map(food => (
                <div key={food.id} className="bg-foreground/5 rounded-lg p-6">
                  <h3 className="text-accent mb-2 text-xl font-semibold">{food.name}</h3>
                  <p className="text-foreground/60 mb-4 text-sm">Acara: {food.occasion}</p>
                  <p className="text-foreground/70 mb-4 text-sm leading-relaxed">
                    {food.description}
                  </p>
                  <div className="bg-accent/10 rounded p-4">
                    <p className="text-accent mb-1 text-xs font-semibold">Makna:</p>
                    <p className="text-foreground/80 text-sm">{food.significance}</p>
                  </div>
                  {food.tradition && (
                    <p className="text-foreground/70 mt-4 text-xs italic">{food.tradition}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Cooking Philosophy */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Filosofi Kuliner Batak</h2>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            {kulinerData.cookingPhilosophy.description}
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {kulinerData.cookingPhilosophy.principles.map((principle: any, index: number) => (
              <div key={index} className="bg-foreground/5 rounded-lg p-6">
                <h3 className="text-accent mb-3 text-lg font-semibold">{principle.name}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {principle.explanation}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Dining Etiquette */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Tata Cara Makan</h2>
          <div className="bg-accent/10 border-accent rounded-lg border-l-4 p-8">
            <p className="text-foreground/80 mb-6 leading-relaxed">
              {kulinerData.diningEtiquette.description}
            </p>
            <div className="space-y-3">
              {kulinerData.diningEtiquette.rules.map((rule: string, index: number) => (
                <div key={index} className="bg-foreground/5 flex items-start rounded p-4">
                  <span className="text-accent mr-3 text-lg">→</span>
                  <span className="text-foreground/80 text-sm">{rule}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Regional Variations */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Variasi Regional</h2>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            {kulinerData.regionalVariations.description}
          </p>
          <div className="grid grid-cols-1 gap-6">
            {kulinerData.regionalVariations.variations.map((region: any, index: number) => (
              <div key={index} className="bg-foreground/5 rounded-lg p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <h3 className="text-accent mb-2 text-xl font-semibold">{region.region}</h3>
                    <p className="text-foreground/70 text-sm">{region.characteristics}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="text-accent mb-2 text-sm font-semibold">Hidangan Khas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {region.specialty.map((dish: string, idx: number) => (
                        <span
                          key={idx}
                          className="bg-accent/20 text-accent rounded-full px-3 py-1 text-xs"
                        >
                          {dish}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery Section */}
        {kulinerImages.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-bold">Galeri Kuliner Batak</h2>
            <p className="text-foreground/70 mb-6">
              Koleksi foto hidangan tradisional Batak yang menggugah selera.
            </p>
            <Gallery images={kulinerImages} columns={3} aspectRatio="square" showCredits={true} />
          </section>
        )}
      </div>
    </div>
  );
}
