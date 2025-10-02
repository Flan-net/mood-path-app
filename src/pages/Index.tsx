import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, BarChart3, BookOpen, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";
import heroImage from "@/assets/hero-wellness.jpg";

const Index = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6 animate-fade-in">
          <div className="relative rounded-3xl overflow-hidden shadow-glow">
            <img 
              src={heroImage} 
              alt="Bienestar emocional" 
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-hero opacity-60"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Tu Diario de Bienestar
              </h1>
              <p className="text-xl md:text-2xl max-w-2xl opacity-95">
                Acompaña tu viaje hacia el bienestar emocional y físico
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="grid md:grid-cols-3 gap-6 animate-slide-up">
          <div className="bg-gradient-card rounded-2xl p-8 shadow-soft hover:shadow-glow transition-all duration-300 border border-border">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
              <Heart className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Registro Diario</h3>
            <p className="text-muted-foreground mb-4">
              Registra tu estado emocional y físico en pocos minutos cada día.
            </p>
            <Link to="/daily-check">
              <Button variant="outline" className="w-full">
                Comenzar Hoy
              </Button>
            </Link>
          </div>

          <div className="bg-gradient-card rounded-2xl p-8 shadow-soft hover:shadow-glow transition-all duration-300 border border-border">
            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-4">
              <BarChart3 className="w-7 h-7 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Tendencias</h3>
            <p className="text-muted-foreground mb-4">
              Visualiza patrones y evolución de tu bienestar a lo largo del tiempo.
            </p>
            <Link to="/dashboard">
              <Button variant="outline" className="w-full">
                Ver Gráficos
              </Button>
            </Link>
          </div>

          <div className="bg-gradient-card rounded-2xl p-8 shadow-soft hover:shadow-glow transition-all duration-300 border border-border">
            <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-4">
              <BookOpen className="w-7 h-7 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Recursos</h3>
            <p className="text-muted-foreground mb-4">
              Accede a herramientas y contenido para apoyar tu bienestar.
            </p>
            <Link to="/resources">
              <Button variant="outline" className="w-full">
                Explorar
              </Button>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-calm rounded-3xl p-12 text-center space-y-6 border border-border shadow-soft">
          <Sparkles className="w-12 h-12 text-primary mx-auto" />
          <h2 className="text-3xl md:text-4xl font-bold">
            Comienza tu Viaje de Bienestar
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unos minutos al día pueden marcar una gran diferencia en tu salud mental y física. 
            Empieza a registrar tus emociones hoy y descubre patrones que te ayudarán a vivir mejor.
          </p>
          <Link to="/daily-check">
            <Button size="lg" className="text-lg px-8 shadow-glow">
              Iniciar Registro Diario
            </Button>
          </Link>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
