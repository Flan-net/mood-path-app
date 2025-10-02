import { useState } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { resources } from "@/data/resources";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Heart, Activity, Moon, Brain, AlertCircle } from "lucide-react";

const categoryIcons = {
  meditation: Heart,
  exercise: Activity,
  sleep: Moon,
  stress: Brain,
  emergency: AlertCircle,
};

const categoryLabels = {
  meditation: "Meditación",
  exercise: "Ejercicio",
  sleep: "Sueño",
  stress: "Manejo de Estrés",
  emergency: "Ayuda Urgente",
};

const categoryColors = {
  meditation: "bg-primary/10 text-primary border-primary/20",
  exercise: "bg-accent/10 text-accent border-accent/20",
  sleep: "bg-secondary/10 text-secondary border-secondary/20",
  stress: "bg-warning/10 text-warning border-warning/20",
  emergency: "bg-destructive/10 text-destructive border-destructive/20",
};

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredResources = selectedCategory
    ? resources.filter(r => r.category === selectedCategory)
    : resources;

  const categories = Array.from(new Set(resources.map(r => r.category)));

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Recursos de Apoyo</h1>
          <p className="text-muted-foreground">
            Herramientas y contenido para fortalecer tu bienestar
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
            className="rounded-full"
          >
            Todos
          </Button>
          {categories.map(cat => {
            const Icon = categoryIcons[cat as keyof typeof categoryIcons];
            return (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
                className="rounded-full"
              >
                <Icon className="w-4 h-4 mr-2" />
                {categoryLabels[cat as keyof typeof categoryLabels]}
              </Button>
            );
          })}
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => {
            const Icon = categoryIcons[resource.category as keyof typeof categoryIcons];
            return (
              <Card 
                key={resource.id} 
                className="p-6 bg-gradient-card shadow-soft border-border hover:shadow-glow transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${categoryColors[resource.category as keyof typeof categoryColors]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${categoryColors[resource.category as keyof typeof categoryColors]}`}
                  >
                    {categoryLabels[resource.category as keyof typeof categoryLabels]}
                  </Badge>
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 flex-grow">
                  {resource.description}
                </p>
                
                <a 
                  href={resource.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Acceder
                  </Button>
                </a>
              </Card>
            );
          })}
        </div>

        {/* Emergency Notice */}
        <Card className="p-8 bg-destructive/5 border-destructive/20 shadow-soft">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-destructive">Ayuda Inmediata</h3>
              <p className="text-muted-foreground">
                Si estás experimentando una crisis emocional o pensamientos de autolesión, 
                por favor busca ayuda profesional inmediatamente. Puedes llamar a la línea 
                de atención en crisis <strong>024</strong> disponible 24/7.
              </p>
              <p className="text-sm text-muted-foreground">
                Recuerda: pedir ayuda es un acto de valentía, no de debilidad.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Resources;
