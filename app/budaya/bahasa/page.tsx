import {
  getAllDialects,
  getCommonPhrases,
  getUmpasaExamples,
  getKinshipTerms,
  getBahasaData,
} from '@/lib/data';

export default function BahasaPage() {
  const dialects = getAllDialects();
  const phrases = getCommonPhrases();
  const umpasaExamples = getUmpasaExamples();
  const kinshipTerms = getKinshipTerms();
  const bahasaData = getBahasaData();

  return (
    <div className="w-full px-4 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <h1 className="text-accent mb-6 text-4xl font-bold md:text-5xl">Bahasa Batak</h1>
        <div className="bg-accent/10 border-accent mb-12 rounded-lg border-l-4 p-8">
          <p className="text-foreground/80 mb-4 text-lg leading-relaxed">
            {bahasaData.overview.description}
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <p className="text-accent mb-1 text-sm font-semibold">Penutur</p>
              <p className="text-foreground/70 text-sm">{bahasaData.overview.speakers}</p>
            </div>
            <div>
              <p className="text-accent mb-1 text-sm font-semibold">Wilayah</p>
              <p className="text-foreground/70 text-sm">{bahasaData.overview.region}</p>
            </div>
            <div>
              <p className="text-accent mb-1 text-sm font-semibold">Aksara</p>
              <p className="text-foreground/70 text-sm">{bahasaData.overview.script}</p>
            </div>
          </div>
        </div>

        {/* Dialects Section */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Dialek Bahasa Batak</h2>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            Bahasa Batak terdiri dari beberapa dialek yang digunakan oleh sub-etnis yang berbeda.
            Setiap dialek memiliki keunikan dalam kosakata, intonasi, dan grammar.
          </p>

          <div className="space-y-6">
            {dialects.map(dialect => (
              <div key={dialect.id} className="bg-foreground/5 rounded-lg p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-accent mb-1 text-2xl font-semibold">{dialect.name}</h3>
                    <p className="text-foreground/60 text-sm italic">{dialect.alternateName}</p>
                  </div>
                  <span className="bg-accent/20 text-accent rounded-full px-4 py-1 text-sm">
                    {dialect.speakers} penutur
                  </span>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-accent mb-1 text-sm font-semibold">Wilayah:</p>
                    <p className="text-foreground/70 text-sm">{dialect.region}</p>
                  </div>
                  <div>
                    <p className="text-accent mb-1 text-sm font-semibold">Status:</p>
                    <p className="text-foreground/70 text-sm">{dialect.status}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-accent mb-3 text-lg font-semibold">Karakteristik:</h4>
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    {dialect.characteristics.map((char, idx) => (
                      <div key={idx} className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <span className="text-foreground/70 text-sm">{char}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {dialect.examples.length > 0 && (
                  <div>
                    <h4 className="text-accent mb-3 text-lg font-semibold">Contoh Kalimat:</h4>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {dialect.examples.map((example, idx) => (
                        <div key={idx} className="bg-background rounded-lg p-4">
                          <p className="text-accent mb-1 font-medium">
                            {example[dialect.id as keyof typeof example] || example.toba}
                          </p>
                          <p className="text-foreground/70 mb-2 text-sm">{example.indonesian}</p>
                          <p className="text-foreground/60 text-xs italic">{example.context}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Common Phrases Section */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Frasa Umum Bahasa Batak Toba</h2>
          <p className="text-foreground/70 mb-8 leading-relaxed">{phrases.description}</p>

          {/* Greetings */}
          <div className="mb-8">
            <h3 className="mb-4 text-2xl font-semibold">Salam dan Sapaan</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {phrases.greetings.map((phrase, idx) => (
                <div key={idx} className="bg-foreground/5 rounded-lg p-4">
                  <p className="text-accent mb-1 text-lg font-semibold">{phrase.toba}</p>
                  <p className="text-foreground/70 mb-2 text-sm">{phrase.indonesian}</p>
                  <p className="text-foreground/60 mb-2 text-xs italic">{phrase.usage}</p>
                  {phrase.response && (
                    <div className="bg-accent/10 rounded p-2">
                      <p className="text-foreground/80 text-xs">
                        <span className="font-semibold">Jawaban:</span> {phrase.response}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Courtesy */}
          <div className="mb-8">
            <h3 className="mb-4 text-2xl font-semibold">Kesopanan</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {phrases.courtesy.map((phrase, idx) => (
                <div key={idx} className="bg-foreground/5 rounded-lg p-4">
                  <p className="text-accent mb-1 text-lg font-semibold">{phrase.toba}</p>
                  <p className="text-foreground/70 mb-2 text-sm">{phrase.indonesian}</p>
                  <p className="text-foreground/60 text-xs italic">{phrase.usage}</p>
                  {phrase.response && (
                    <div className="bg-accent/10 mt-2 rounded p-2">
                      <p className="text-foreground/80 text-xs">
                        <span className="font-semibold">Jawaban:</span> {phrase.response}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Family Terms */}
          <div className="mb-8">
            <h3 className="mb-4 text-2xl font-semibold">Istilah Keluarga</h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {phrases.family.map((phrase, idx) => (
                <div key={idx} className="bg-foreground/5 rounded-lg p-4">
                  <p className="text-accent mb-1 font-semibold">{phrase.toba}</p>
                  <p className="text-foreground/70 text-sm">{phrase.indonesian}</p>
                  {phrase.usage && (
                    <p className="text-foreground/60 mt-2 text-xs italic">{phrase.usage}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dalihan Na Tolu Kinship */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Sistem Kekerabatan</h2>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            {kinshipTerms.description}
          </p>

          <div className="bg-accent/10 border-accent mb-8 rounded-lg border-l-4 p-8">
            <h3 className="text-accent mb-6 text-2xl font-semibold">Dalihan Na Tolu</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="bg-foreground/5 rounded-lg p-6">
                <h4 className="text-accent mb-2 text-xl font-semibold">
                  {kinshipTerms.dalihanNaTolu.hulahula.term}
                </h4>
                <p className="text-foreground/70 mb-3 text-sm">
                  {kinshipTerms.dalihanNaTolu.hulahula.meaning}
                </p>
                <p className="text-accent mb-2 text-xs font-semibold">
                  Status: {kinshipTerms.dalihanNaTolu.hulahula.status}
                </p>
                <p className="text-foreground/60 text-xs">
                  Contoh: {kinshipTerms.dalihanNaTolu.hulahula.examples.join(', ')}
                </p>
              </div>

              <div className="bg-foreground/5 rounded-lg p-6">
                <h4 className="text-accent mb-2 text-xl font-semibold">
                  {kinshipTerms.dalihanNaTolu.dongantubu.term}
                </h4>
                <p className="text-foreground/70 mb-3 text-sm">
                  {kinshipTerms.dalihanNaTolu.dongantubu.meaning}
                </p>
                <p className="text-accent mb-2 text-xs font-semibold">
                  Status: {kinshipTerms.dalihanNaTolu.dongantubu.status}
                </p>
                <p className="text-foreground/60 text-xs">
                  Contoh: {kinshipTerms.dalihanNaTolu.dongantubu.examples.join(', ')}
                </p>
              </div>

              <div className="bg-foreground/5 rounded-lg p-6">
                <h4 className="text-accent mb-2 text-xl font-semibold">
                  {kinshipTerms.dalihanNaTolu.boruunsure.term}
                </h4>
                <p className="text-foreground/70 mb-3 text-sm">
                  {kinshipTerms.dalihanNaTolu.boruunsure.meaning}
                </p>
                <p className="text-accent mb-2 text-xs font-semibold">
                  Status: {kinshipTerms.dalihanNaTolu.boruunsure.status}
                </p>
                <p className="text-foreground/60 text-xs">
                  Contoh: {kinshipTerms.dalihanNaTolu.boruunsure.examples.join(', ')}
                </p>
              </div>
            </div>
          </div>

          <h3 className="mb-4 text-2xl font-semibold">Istilah Kekerabatan Kompleks</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {kinshipTerms.complexTerms.map((term: any, idx: number) => (
              <div key={idx} className="bg-foreground/5 rounded-lg p-4">
                <h4 className="text-accent mb-2 text-lg font-semibold">{term.term}</h4>
                <p className="text-foreground/70 mb-2 text-sm">{term.meaning}</p>
                <p className="text-foreground/60 text-xs italic">{term.context}</p>
                {term.literal && (
                  <p className="text-foreground/60 mt-2 text-xs">Literal: {term.literal}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Umpasa Section */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Umpasa (Peribahasa Batak)</h2>
          <p className="text-foreground/70 mb-6 leading-relaxed">
            {bahasaData.umpasa.description}
          </p>

          <div className="bg-foreground/5 mb-8 rounded-lg p-6">
            <h3 className="text-accent mb-4 text-lg font-semibold">Karakteristik Umpasa:</h3>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {bahasaData.umpasa.characteristics.map((char: string, idx: number) => (
                <div key={idx} className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span className="text-foreground/70 text-sm">{char}</span>
                </div>
              ))}
            </div>
          </div>

          <h3 className="mb-6 text-2xl font-semibold">Contoh Umpasa</h3>
          <div className="space-y-6">
            {umpasaExamples.map((umpasa, idx) => (
              <div key={idx} className="bg-accent/10 border-accent rounded-lg border-l-4 p-6">
                <p className="text-accent mb-4 text-lg font-medium italic leading-relaxed">
                  "{umpasa.toba}"
                </p>
                <div className="bg-foreground/5 mb-4 rounded p-4">
                  <p className="text-foreground/70 leading-relaxed">{umpasa.indonesian}</p>
                </div>
                <div className="mb-3">
                  <p className="text-accent mb-1 text-sm font-semibold">Makna:</p>
                  <p className="text-foreground/80 text-sm leading-relaxed">{umpasa.meaning}</p>
                </div>
                <div>
                  <p className="text-accent mb-1 text-sm font-semibold">Penggunaan:</p>
                  <p className="text-foreground/70 text-sm">{umpasa.usage}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Types of Umpasa */}
          <div className="mt-8">
            <h3 className="mb-4 text-xl font-semibold">Jenis-jenis Umpasa</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {bahasaData.umpasa.types.map((type: any, idx: number) => (
                <div key={idx} className="bg-foreground/5 rounded-lg p-4">
                  <h4 className="text-accent mb-2 font-semibold">{type.type}</h4>
                  <p className="text-foreground/70 mb-2 text-sm">{type.description}</p>
                  <p className="text-foreground/60 text-xs">Acara: {type.occasion}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proverbs */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Peribahasa Sehari-hari</h2>
          <p className="text-foreground/70 mb-8">{bahasaData.proverbs.description}</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {bahasaData.proverbs.examples.map((proverb: any, idx: number) => (
              <div key={idx} className="bg-foreground/5 rounded-lg p-4">
                <p className="text-accent mb-2 font-medium italic">{proverb.toba}</p>
                <p className="text-foreground/70 mb-3 text-sm">{proverb.indonesian}</p>
                <div className="bg-accent/10 rounded p-3">
                  <p className="text-foreground/80 text-xs">{proverb.meaning}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Literature Section */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Sastra Batak</h2>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            {bahasaData.literature.description}
          </p>

          <div className="mb-8">
            <h3 className="mb-4 text-2xl font-semibold">Tradisi Lisan</h3>
            <p className="text-foreground/70 mb-6">
              {bahasaData.literature.oralTradition.description}
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {bahasaData.literature.oralTradition.forms.map((form: any, idx: number) => (
                <div key={idx} className="bg-foreground/5 rounded-lg p-6">
                  <h4 className="text-accent mb-2 text-lg font-semibold">{form.name}</h4>
                  <p className="text-foreground/70 mb-4 text-sm">{form.description}</p>
                  {form.context && (
                    <p className="text-foreground/60 text-xs italic">Konteks: {form.context}</p>
                  )}
                  {form.examples && (
                    <div className="mt-3">
                      <p className="text-accent mb-2 text-xs font-semibold">Contoh:</p>
                      {form.examples.map((example: string, i: number) => (
                        <p key={i} className="text-foreground/70 text-xs">
                          • {example}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-2xl font-semibold">Tradisi Tulisan: Pustaha</h3>
            <div className="bg-accent/10 border-accent rounded-lg border-l-4 p-8">
              <p className="text-foreground/80 mb-6 leading-relaxed">
                {bahasaData.literature.writtenTradition.pustaha.description}
              </p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="text-accent mb-3 text-lg font-semibold">Isi Pustaha:</h4>
                  <ul className="space-y-2">
                    {bahasaData.literature.writtenTradition.pustaha.content.map(
                      (content: string, idx: number) => (
                        <li key={idx} className="text-foreground/70 flex items-start text-sm">
                          <span className="text-accent mr-2">→</span>
                          {content}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
                <div>
                  <div className="bg-foreground/5 mb-4 rounded p-4">
                    <p className="text-accent mb-1 text-sm font-semibold">Material:</p>
                    <p className="text-foreground/70 text-sm">
                      {bahasaData.literature.writtenTradition.pustaha.material}
                    </p>
                  </div>
                  <div className="bg-foreground/5 mb-4 rounded p-4">
                    <p className="text-accent mb-1 text-sm font-semibold">Aksara:</p>
                    <p className="text-foreground/70 text-sm">
                      {bahasaData.literature.writtenTradition.pustaha.script}
                    </p>
                  </div>
                  <div className="bg-foreground/5 rounded p-4">
                    <p className="text-accent mb-1 text-sm font-semibold">Penjaga:</p>
                    <p className="text-foreground/70 text-sm">
                      {bahasaData.literature.writtenTradition.pustaha.keepers}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Language Preservation */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Pelestarian Bahasa</h2>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            {bahasaData.languagePreservation.description}
          </p>

          <div className="mb-8">
            <h3 className="mb-4 text-xl font-semibold">Tantangan:</h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {bahasaData.languagePreservation.challenges.map((challenge: string, idx: number) => (
                <div key={idx} className="bg-foreground/5 flex items-start rounded p-4">
                  <span className="text-accent mr-2">⚠</span>
                  <span className="text-foreground/70 text-sm">{challenge}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold">Upaya Pelestarian:</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {bahasaData.languagePreservation.efforts.map((effort: any, idx: number) => (
                <div key={idx} className="bg-foreground/5 rounded-lg p-6">
                  <h4 className="text-accent mb-3 text-lg font-semibold">{effort.initiative}</h4>
                  <p className="text-foreground/70 text-sm leading-relaxed">{effort.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
