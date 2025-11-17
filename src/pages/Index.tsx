import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, BarChart3, BookOpen, Sparkles, UserCheck, Edit, PieChart, BrainCircuit, Smile, TrendingUp, Zap } from "lucide-react";
import Layout from "@/components/Layout";
import heroImage from "@/assets/hero-wellness.jpg";

const Index = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-24 mb-16">
        <section className="text-center space-y-6 animate-fade-in">
          <div className="relative rounded-3xl overflow-hidden shadow-glow">
            <img 
              src={heroImage} 
              alt="Bienestar emocional" 
              className="w-full h-[450px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-hero opacity-60"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Tu Diario de Bienestar
              </h1>
              <p className="text-xl md:text-2xl max-w-2xl opacity-95 mb-8">
                Acompaña tu viaje hacia el bienestar emocional y físico
              </p>
              <Link to="/daily-check">
                <Button size="lg" className="text-lg px-8 shadow-glow">
                  Comienza hoy mismo tu registro
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Cómo funciona?</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
            En solo tres simples pasos, puedes comenzar a tomar el control de tu bienestar.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Edit className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Registra tu día</h3>
              <p className="text-muted-foreground">Dedica unos minutos a anotar tus emociones, actividades y estado físico.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                <PieChart className="w-10 h-10 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Visualiza Tendencias</h3>
              <p className="text-muted-foreground">Nuestros gráficos te mostrarán cómo evolucionan tus hábitos y emociones.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <UserCheck className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Descubre Patrones</h3>
              <p className="text-muted-foreground">Encuentra conexiones valiosas que te ayudarán a mejorar tu calidad de vida.</p>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Descubre los Beneficios</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
            Llevar un diario de bienestar te ayuda a conectar contigo mismo y a cultivar una vida más plena.
          </p>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 text-left">
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 bg-blue-500/10 rounded-lg flex-shrink-0 flex items-center justify-center">
                <BrainCircuit className="w-7 h-7 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Aumenta tu Autoconocimiento</h3>
                <p className="text-muted-foreground">Identifica qué actividades, pensamientos y hábitos influyen directamente en tu estado de ánimo.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 bg-green-500/10 rounded-lg flex-shrink-0 flex items-center justify-center">
                <Smile className="w-7 h-7 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Reduce el Estrés y la Ansiedad</h3>
                <p className="text-muted-foreground">Exteriorizar tus pensamientos y emociones es una técnica probada para aliviar la carga mental.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 bg-purple-500/10 rounded-lg flex-shrink-0 flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-purple-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Fomenta Hábitos Positivos</h3>
                <p className="text-muted-foreground">Al ser consciente de tus acciones, es más fácil reforzar las que te hacen bien y cambiar las que no.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 bg-yellow-500/10 rounded-lg flex-shrink-0 flex items-center justify-center">
                <Zap className="w-7 h-7 text-yellow-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Mejora tu Bienestar Físico</h3>
                <p className="text-muted-foreground">Encuentra la conexión entre tu descanso, alimentación y ejercicio con tu energía y estado emocional.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-calm rounded-3xl p-12 text-center space-y-6 border border-border shadow-soft">
          <Sparkles className="w-12 h-12 text-primary mx-auto" />
          <h2 className="text-3xl md:text-4xl font-bold">
            Comienza tu Viaje de Bienestar
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unos minutos al día pueden marcar una gran diferencia en tu salud mental y física. 
            Empieza a registrar tus emociones hoy y descubre patrones que te ayudarán a vivir mejor.
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default Index;