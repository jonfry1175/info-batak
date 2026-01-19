import { Metadata } from 'next';
import Image from 'next/image';
import { Gallery } from '@/components/ui/Gallery';
import { PageDiscussion } from '@/components/discussion';
import { PageHero } from '@/components/layout/PageHero';
import {
  getAllDishes,
  getAllDrinks,
  getCeremonialFoods,
  getKulinerData,
  getImagesByCategory,
} from '@/lib/data';

export const metadata: Metadata = {
  title: 'Kuliner Batak - Arsik, Saksang, Naniura & Andaliman',
  description:
    'Temukan kuliner khas Batak: Arsik ikan mas, Saksang daging babi, Naniura (sashimi Batak), hidangan ceremonial, dengan bumbu andaliman yang khas. Filosofi dan tradisi makan masyarakat Batak.',
  keywords: [
    'makanan batak',
    'arsik ikan mas',
    'saksang',
    'naniura',
    'andaliman',
    'tuak batak',
    'kuliner batak',
    'masakan batak',
  ],
  openGraph: {
    title: 'Kuliner Batak - Cita Rasa Tradisional Sumatera Utara',
    description:
      'Hidangan khas Batak dengan bumbu andaliman dan filosofi mendalam dalam setiap sajian.',
    url: 'https://infobatak.id/budaya/kuliner',
    images: ['/images/budaya/kuliner/hero-kuliner.png'],
  },
  alternates: {
    canonical: 'https://infobatak.id/budaya/kuliner',
  },
};

export default function KulinerPage() {
  const dishes = getAllDishes();
  const drinks = getAllDrinks();
  const ceremonialFoods = getCeremonialFoods();
  const kulinerData = getKulinerData();

  // Get images for gallery
  const kulinerImages = getImagesByCategory('Budaya', 'Kuliner');

  // Group dishes by category
  const mainDishes = dishes.filter((d) => d.category === 'main_dish');
  const appetizers = dishes.filter((d) => d.category === 'appetizer');
  const soups = dishes.filter((d) => d.category === 'soup');

  return (
    <>
      <PageHero
        title="Kuliner Tradisional Batak"
        subtitle="Cita rasa rempah yang kuat, pedas, dan penuh makna budaya. Sebuah warisan leluhur yang menggugah selera."
        backgroundImage="/images/budaya/kuliner/hero-kuliner.png"
      />

      <div className="w-full px-4 py-12">
        <div className="mx-auto max-w-5xl">
          {/* Header Description - Removed as it's now partly in Hero, but let's keep a brief intro if needed, or rely on Hero subtitle */
          /* Keeping a small intro text below hero is good for SEO and context */
          }
          <div className="mb-16 text-center">
             <p className="mx-auto max-w-3xl text-lg leading-relaxed text-foreground/80">
              Kuliner Batak terkenal dengan penggunaan bumbu yang khas seperti 
              <span className="font-semibold text-accent"> andaliman</span> (merica Batak) yang memberikan 
              sensasi kesemutan. Setiap hidangan tidak hanya lezat, tetapi juga sarat dengan 
              filosofi kehidupan masyarakat Batak, mempererat persaudaraan dalam konsep Dalihan Na Tolu.
            </p>
          </div>

          {/* Signature Dishes Grid */}
          <section className="mb-20">
            <h2 className="mb-8 flex items-center gap-3 text-3xl font-bold">
              <span className="h-8 w-2 rounded-full bg-accent"></span>
              Hidangan Utama
            </h2>
            
            {/* Featured Image for Main Dishes */}
            <div className="relative mb-10 h-[400px] w-full overflow-hidden rounded-2xl shadow-xl">
               <Image
                 src="/images/budaya/kuliner/arsik.png"
                 alt="Arsik Ikan Mas"
                 fill
                 className="object-cover transition-transform duration-700 hover:scale-105"
               />
               <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6">
                 <p className="text-xl font-bold text-white">Arsik Ikan Mas</p>
                 <p className="text-white/80">Simbol keberkatan dan kehidupan dalam budaya Batak</p>
               </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {mainDishes.map((dish) => (
                <div key={dish.id} className="group overflow-hidden rounded-xl border border-foreground/10 bg-background shadow-sm transition-all hover:shadow-md">
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-accent group-hover:underline decoration-accent/30 underline-offset-4">{dish.name}</h3>
                        {dish.alternateName && (
                          <p className="text-sm italic text-foreground/60">{dish.alternateName}</p>
                        )}
                      </div>
                      <div className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                        Utama
                      </div>
                    </div>
                    
                    <p className="mb-6 leading-relaxed text-foreground/70">{dish.description}</p>

                    <div className="mb-6 grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-foreground/5 p-3">
                        <h4 className="mb-1 text-xs font-semibold text-accent uppercase tracking-wider">Rasa</h4>
                        <p className="text-sm text-foreground/80">{dish.taste}</p>
                      </div>
                      <div className="rounded-lg bg-foreground/5 p-3">
                         <h4 className="mb-1 text-xs font-semibold text-accent uppercase tracking-wider">Bumbu Utama</h4>
                         <p className="text-sm text-foreground/80 truncate">{dish.mainIngredients.slice(0, 3).join(', ')}...</p>
                      </div>
                    </div>

                    <div className="border-t border-dashed border-foreground/20 pt-4">
                      <h4 className="mb-2 flex items-center text-sm font-semibold text-accent">
                        <span className="mr-2">💡</span> Makna Budaya
                      </h4>
                      <p className="text-sm text-foreground/70">{dish.significance}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Andaliman Highlight */}
          <section className="mb-20 overflow-hidden rounded-2xl bg-gradient-to-br from-background to-foreground/5 shadow-lg ring-1 ring-foreground/10">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 min-h-[300px] w-full md:h-full">
                <Image
                  src="/images/budaya/kuliner/andaliman.png"
                  alt="Andaliman Fresh"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 md:p-12">
                <div className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
                  Rempah Khas Batak
                </div>
                <h2 className="mb-4 text-3xl font-bold text-foreground">
                  {kulinerData.ingredients.andaliman.name}
                </h2>
                <h3 className="mb-6 text-xl font-medium text-foreground/60 italic">
                  "{kulinerData.ingredients.andaliman.scientificName}"
                </h3>
                
                <p className="mb-8 text-lg leading-relaxed text-foreground/80">
                  {kulinerData.ingredients.andaliman.description}
                </p>

                <div className="space-y-6">
                  <div>
                    <h4 className="mb-2 text-sm font-bold uppercase tracking-widest text-accent">Karakteristik Rasa</h4>
                    <p className="text-foreground/70">
                      {kulinerData.ingredients.andaliman.taste}
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-bold uppercase tracking-widest text-accent">Penggunaan</h4>
                    <p className="text-foreground/70">
                      {kulinerData.ingredients.andaliman.usage}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tuak Section */}
          <section className="mb-20">
            <h2 className="mb-8 flex items-center gap-3 text-3xl font-bold">
              <span className="h-8 w-2 rounded-full bg-accent"></span>
              Tuak: Minuman Tradisi
            </h2>
            
            {drinks
              .filter((drink) => drink.id === 'tuak')
              .map((drink) => (
                <div key={drink.id} className="overflow-hidden rounded-2xl bg-foreground/5 dark:bg-foreground/10">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="p-8 lg:p-12">
                      <h3 className="mb-4 text-3xl font-bold text-accent">{drink.name}</h3>
                      <p className="mb-8 text-lg leading-relaxed text-foreground/80">{drink.description}</p>
                      
                      <div className="mb-8 grid grid-cols-2 gap-6">
                        <div className="rounded-xl bg-background p-4 shadow-sm">
                           <span className="block text-xs font-bold uppercase text-accent">Rasa</span>
                           <span className="text-lg font-medium">{drink.taste}</span>
                        </div>
                        <div className="rounded-xl bg-background p-4 shadow-sm">
                           <span className="block text-xs font-bold uppercase text-accent">Kadar Alkohol</span>
                           <span className="text-lg font-medium">{drink.alcoholContent}</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Peran dalam Budaya:</h4>
                        <ul className="space-y-3">
                          {drink.culturalRole?.map((role, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0"></span>
                              <span className="text-foreground/80">{role}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="relative h-[400px] min-h-full lg:h-auto">
                      <Image
                        src="/images/budaya/kuliner/tuak.png"
                        alt="Tuak Batak Traditional Drink"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-8 flex items-end">
                         <p className="text-white/90 italic font-medium">"{drink.tradition}"</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </section>

           {/* Appetizers & Soups */}
            {appetizers.length > 0 && (
            <section className="mb-20">
              <h2 className="mb-8 flex items-center gap-3 text-3xl font-bold">
                <span className="h-8 w-2 rounded-full bg-accent"></span>
                Hidangan Pembuka & Sayur
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...appetizers, ...soups].map((dish) => (
                  <div key={dish.id} className="group flex flex-col overflow-hidden rounded-xl border border-foreground/10 bg-card shadow-sm transition-all hover:shadow-md hover:border-accent/30">
                    <div className="relative h-44 w-full">
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      />
                    </div>
                    <div className="flex flex-col p-6">
                      <h3 className="mb-2 text-xl font-bold text-foreground">{dish.name}</h3>
                      <p className="mb-4 flex-grow text-sm leading-relaxed text-foreground/70">
                        {dish.description}
                      </p>
                      <div className="mt-auto">
                        <div className="mb-3 inline-block rounded bg-accent/10 px-2 py-1 text-xs font-medium text-accent">
                          {dish.taste}
                        </div>
                        {dish.healthNote && (
                          <p className="text-xs italic text-foreground/50 border-l-2 border-accent/50 pl-2">
                            {dish.healthNote}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Ceremonial Foods */}
          {ceremonialFoods.length > 0 && (
            <section className="mb-20">
               <div className="mb-8 text-center">
                  <h2 className="mb-4 text-3xl font-bold">Makanan Upacara Adat</h2>
                  <p className="mx-auto max-w-2xl text-foreground/70">
                   Simbolisme dalam setiap suguhan, melambangkan doa, harapan, dan struktur sosial Dalihan Na Tolu.
                  </p>
               </div>
               
               <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                 {ceremonialFoods.map((food, index) => (
                   <div key={food.id} className={`relative flex flex-col overflow-hidden rounded-2xl ${index % 2 === 0 ? 'bg-accent/5' : 'bg-foreground/5'} p-0`}>
                     <div className="relative h-56 w-full overflow-hidden">
                       <Image
                         src={food.image}
                         alt={food.name}
                         fill
                         className="object-cover"
                         sizes="(min-width: 1024px) 50vw, 100vw"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                     </div>
                     <div className="p-8">
                       <div className="mb-4 flex items-center justify-between">
                         <h3 className="text-2xl font-bold text-accent">{food.name}</h3>
                         <span className="rounded-full bg-background px-3 py-1 text-xs font-bold uppercase tracking-wider text-foreground shadow-sm">
                           Sakral
                         </span>
                       </div>
                       <p className="mb-2 text-sm font-semibold text-foreground/80">Acara: {food.occasion}</p>
                       <p className="mb-6 text-foreground/70">{food.description}</p>
                       
                       <div className="mt-auto rounded-xl bg-background/50 p-4 backdrop-blur-sm">
                         <p className="text-sm italic text-foreground/80">
                           <span className="font-bold text-accent">Makna:</span> {food.significance}
                         </p>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
            </section>
          )}

          {/* Cooking Philosophy */}
          <section className="mb-20 rounded-3xl bg-foreground/5 p-8 md:p-12">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
               <div>
                  <h2 className="mb-6 text-3xl font-bold">Filosofi Kuliner</h2>
                  <p className="mb-8 text-lg leading-relaxed text-foreground/70">
                    {kulinerData.cookingPhilosophy.description}
                  </p>
                  
                  <div className="space-y-6">
                    {kulinerData.cookingPhilosophy.principles.map((principle: any, index: number) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-circle bg-accent text-xl font-bold text-white rounded-full">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="mb-1 text-lg font-bold text-foreground">{principle.name}</h3>
                          <p className="text-foreground/70 text-sm leading-relaxed">
                            {principle.explanation}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
               <div className="relative min-h-[300px] overflow-hidden rounded-2xl">
                 <Image 
                   src="/images/budaya/adat/dalihan-na-tolu.png"
                   alt="Filosofi Batak"
                   fill
                   className="object-cover opacity-80"
                 />
                 <div className="absolute inset-0 bg-accent/10 mix-blend-multiply"></div>
               </div>
            </div>
          </section>

          {/* Dining Etiquette */}
          <section className="mb-20">
            <h2 className="mb-8 flex items-center gap-3 text-3xl font-bold">
              <span className="h-8 w-2 rounded-full bg-accent"></span>
              Tata Cara Makan
            </h2>
            <div className="rounded-2xl border border-accent/20 bg-accent/5 p-8 md:p-10">
              <p className="mb-8 text-lg font-medium text-foreground/80">
                {kulinerData.diningEtiquette.description}
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {kulinerData.diningEtiquette.rules.map((rule: string, index: number) => (
                  <div key={index} className="flex items-center gap-4 rounded-lg bg-background p-4 shadow-sm">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent text-lg">✓</span>
                    <span className="text-sm font-medium text-foreground/80">{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Regional Variations */}
          <section className="mb-20">
             <div className="mb-8 flex items-end justify-between border-b pb-4">
               <div>
                 <h2 className="text-3xl font-bold">Variasi Regional</h2>
                 <p className="mt-2 text-foreground/60">{kulinerData.regionalVariations.description}</p>
               </div>
             </div>
             
             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {kulinerData.regionalVariations.variations.map((region: any, index: number) => (
                  <div key={index} className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-foreground/5 to-foreground/10 p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="absolute right-0 top-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-accent/10 transition-transform group-hover:scale-150"></div>
                    
                    <h3 className="relative z-10 mb-2 text-2xl font-bold text-accent">{region.region}</h3>
                    <p className="relative z-10 mb-4 text-sm text-foreground/70">{region.characteristics}</p>
                    
                    <div className="relative z-10">
                      <h4 className="mb-2 text-xs font-bold text-foreground/50 uppercase">Hidangan Khas</h4>
                      <div className="flex flex-wrap gap-2">
                        {region.specialty.map((dish: string, idx: number) => (
                          <span
                            key={idx}
                            className="rounded-md bg-background/80 px-2 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm"
                          >
                            {dish}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>

          {/* Gallery Section */}
          {kulinerImages.length > 0 && (
            <section className="mb-20">
              <h2 className="mb-8 text-center text-3xl font-bold">Galeri Kuliner Batak</h2>
              <Gallery images={kulinerImages} columns={3} aspectRatio="square" showCredits={true} />
            </section>
          )}

          {/* Discussion Section */}
          <PageDiscussion />
        </div>
      </div>
    </>
  );
}
