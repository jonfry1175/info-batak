'use client';

import { motion } from 'framer-motion';
import { Users, Heart, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const philosophies = [
  {
    title: 'Somba Marhula-hula',
    meaning: 'Hormat kepada Hula-hula',
    description: 'Sikap hormat kepada pihak keluarga pemberi istri (Hula-hula). Mereka dianggap sebagai sumber berkat ("Mata ni ari binsar").',
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
    description: 'Sikap berhati-hati dan saling menjaga perasaan dengan teman semarga (Dongan Tubu) untuk menghindari konflik.',
    icon: Shield,
    color: 'text-amber-500',
    delay: 0.3,
  },
];

export function PhilosophySection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-gorga opacity-30" />
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Dalihan Na Tolu
            </h2>
            <p className="text-lg text-muted-foreground text-balance">
              Falsafah hidup masyarakat Batak yang menjadi landasan sistem kekerabatan dan interaksi sosial yang harmonis.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {philosophies.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: item.delay }}
            >
              <Card className="h-full border-none bg-background/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                <div className={`absolute top-0 left-0 w-1 h-full ${item.color.replace('text-', 'bg-')} opacity-50 group-hover:opacity-100 transition-opacity`} />
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto w-16 h-16 rounded-full bg-background shadow-inner flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`w-8 h-8 ${item.color}`} />
                  </div>
                  <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                  <p className="text-sm font-medium text-accent">{item.meaning}</p>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
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

