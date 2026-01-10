'use client';

import { motion } from 'framer-motion';
import { Users, Heart, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const philosophies = [
  {
    title: 'Somba Marhula-hula',
    meaning: 'Hormat kepada Hula-hula',
    description:
      'Sikap hormat kepada pihak keluarga pemberi istri (Hula-hula). Mereka dianggap sebagai sumber berkat ("Mata ni ari binsar").',
    icon: Users,
    color: 'text-blue-500',
    delay: 0.1,
  },
  {
    title: 'Elek Marboru',
    meaning: 'Mengayomi Boru',
    description: 'Sikap mengayomi dan lemah lembut kepada pihak keluarga penerima istri (Boru).',
    icon: Heart,
    color: 'text-red-500',
    delay: 0.2,
  },
  {
    title: 'Manat Mardongan Tubu',
    meaning: 'Hati-hati kepada Teman Semarga',
    description:
      'Sikap berhati-hati dan saling menjaga perasaan dengan teman semarga (Dongan Tubu) untuk menghindari konflik.',
    icon: Shield,
    color: 'text-amber-500',
    delay: 0.3,
  },
];

export function PhilosophySection() {
  return (
    <section className="relative overflow-hidden py-20">
      {/* Background Pattern */}
      <div className="pattern-gorga absolute inset-0 opacity-30" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="from-foreground to-foreground/70 mb-6 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent md:text-5xl">
              Dalihan Na Tolu
            </h2>
            <p className="text-muted-foreground text-lg text-balance">
              Falsafah hidup masyarakat Batak yang menjadi landasan sistem kekerabatan dan interaksi
              sosial yang harmonis.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {philosophies.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: item.delay }}
            >
              <Card className="bg-background/50 group h-full overflow-hidden border-none shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <div
                  className={`absolute top-0 left-0 h-full w-1 ${item.color.replace('text-', 'bg-')} opacity-50 transition-opacity group-hover:opacity-100`}
                />
                <CardHeader className="pb-4 text-center">
                  <div
                    className={`bg-background mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full shadow-inner transition-transform duration-300 group-hover:scale-110`}
                  >
                    <item.icon className={`h-8 w-8 ${item.color}`} />
                  </div>
                  <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                  <p className="text-accent text-sm font-medium">{item.meaning}</p>
                </CardHeader>
                <CardContent className="text-muted-foreground text-center">
                  {item.description}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
