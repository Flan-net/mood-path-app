import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { saveEntry, getEntryByDate } from "@/utils/storage";
import { DailyEntry } from "@/types/wellness";
import { toast } from "sonner";
import { Smile, Frown, Meh, Battery, Moon, Brain, Dumbbell, AlertCircle, CheckCircle, TrendingUp } from "lucide-react";

const DailyCheck = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];
  
  const [mood, setMood] = useState(5);
  const [energy, setEnergy] = useState(5);
  const [sleep, setSleep] = useState(5);
  const [stress, setStress] = useState(5);
  const [exercise, setExercise] = useState(false);
  const [notes, setNotes] = useState("");
  const [showDiagnosis, setShowDiagnosis] = useState(false);
  const [diagnosis, setDiagnosis] = useState({
    overall: "",
    mood: "",
    energy: "",
    sleep: "",
    stress: "",
    recommendations: [] as string[]
  });

  useEffect(() => {
    const existingEntry = getEntryByDate(today);
    if (existingEntry) {
      setMood(existingEntry.mood);
      setEnergy(existingEntry.energy);
      setSleep(existingEntry.sleep);
      setStress(existingEntry.stress);
      setExercise(existingEntry.exercise);
      setNotes(existingEntry.notes);
    }
  }, [today]);

  const getMoodIcon = (value: number) => {
    if (value <= 3) return <Frown className="w-6 h-6 text-destructive" />;
    if (value <= 6) return <Meh className="w-6 h-6 text-warning" />;
    return <Smile className="w-6 h-6 text-success" />;
  };

  const generateDiagnosis = () => {
    const recommendations: string[] = [];
    let overall = "";
    
    // Análisis del estado de ánimo
    let moodAnalysis = "";
    if (mood >= 7) {
      moodAnalysis = "Tu estado de ánimo es excelente. ¡Sigue así!";
    } else if (mood >= 5) {
      moodAnalysis = "Tu estado de ánimo está en un nivel moderado. Considera actividades que disfrutes.";
      recommendations.push("Dedica tiempo a hobbies que te hagan feliz");
    } else {
      moodAnalysis = "Tu estado de ánimo está bajo. Es importante cuidar tu salud mental.";
      recommendations.push("Considera hablar con alguien de confianza o un profesional");
      recommendations.push("Practica técnicas de gratitud diaria");
    }
    
    // Análisis de energía
    let energyAnalysis = "";
    if (energy >= 7) {
      energyAnalysis = "Tienes excelentes niveles de energía.";
    } else if (energy >= 5) {
      energyAnalysis = "Tu energía está en niveles moderados.";
      recommendations.push("Asegúrate de mantener una buena hidratación");
    } else {
      energyAnalysis = "Tus niveles de energía están bajos.";
      recommendations.push("Revisa tus hábitos de alimentación y descanso");
      recommendations.push("Considera una caminata corta al aire libre");
    }
    
    // Análisis del sueño
    let sleepAnalysis = "";
    if (sleep >= 7) {
      sleepAnalysis = "Tu calidad de sueño es óptima.";
    } else if (sleep >= 5) {
      sleepAnalysis = "Tu sueño podría mejorar.";
      recommendations.push("Establece una rutina de sueño regular");
    } else {
      sleepAnalysis = "La calidad de tu sueño necesita atención.";
      recommendations.push("Evita pantallas 1 hora antes de dormir");
      recommendations.push("Crea un ambiente tranquilo para descansar");
    }
    
    // Análisis del estrés
    let stressAnalysis = "";
    if (stress <= 3) {
      stressAnalysis = "Tus niveles de estrés son bajos. ¡Excelente!";
    } else if (stress <= 6) {
      stressAnalysis = "Tienes niveles moderados de estrés.";
      recommendations.push("Practica técnicas de respiración profunda");
    } else {
      stressAnalysis = "Tus niveles de estrés son altos.";
      recommendations.push("Considera practicar meditación o yoga");
      recommendations.push("Identifica y reduce fuentes de estrés cuando sea posible");
    }
    
    // Análisis del ejercicio
    if (exercise) {
      overall = "¡Excelente trabajo al hacer ejercicio hoy! ";
    } else {
      recommendations.push("Intenta incluir al menos 20 minutos de actividad física");
    }
    
    // Evaluación general
    const avgScore = (mood + energy + sleep + (10 - stress)) / 4;
    if (avgScore >= 7) {
      overall += "Tu bienestar general es muy bueno. Continúa con estos hábitos saludables.";
    } else if (avgScore >= 5) {
      overall += "Tu bienestar está en un nivel moderado. Hay áreas donde puedes mejorar.";
    } else {
      overall += "Tu bienestar necesita atención. Es importante que te cuides y busques apoyo.";
    }
    
    return {
      overall,
      mood: moodAnalysis,
      energy: energyAnalysis,
      sleep: sleepAnalysis,
      stress: stressAnalysis,
      recommendations: recommendations.slice(0, 4) // Máximo 4 recomendaciones
    };
  };

  const handleSubmit = () => {
    const entry: DailyEntry = {
      id: today,
      date: today,
      mood,
      energy,
      sleep,
      stress,
      exercise,
      notes,
    };

    saveEntry(entry);
    
    // Generar y mostrar diagnóstico
    const newDiagnosis = generateDiagnosis();
    setDiagnosis(newDiagnosis);
    setShowDiagnosis(true);
    
    toast.success("¡Registro guardado exitosamente!");
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Registro Diario</h1>
          <p className="text-muted-foreground">
            ¿Cómo te sientes hoy? Tómate un momento para reflexionar.
          </p>
        </div>

        <Card className="p-8 space-y-8 bg-gradient-card shadow-soft border-border">
          {/* Mood */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold flex items-center gap-2">
                {getMoodIcon(mood)}
                Estado de Ánimo
              </Label>
              <span className="text-2xl font-bold text-primary">{mood}/10</span>
            </div>
            <Slider
              value={[mood]}
              onValueChange={(v) => setMood(v[0])}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">
              1 = Muy bajo, 10 = Excelente
            </p>
          </div>

          {/* Energy */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold flex items-center gap-2">
                <Battery className="w-6 h-6 text-accent" />
                Nivel de Energía
              </Label>
              <span className="text-2xl font-bold text-accent">{energy}/10</span>
            </div>
            <Slider
              value={[energy]}
              onValueChange={(v) => setEnergy(v[0])}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          {/* Sleep */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold flex items-center gap-2">
                <Moon className="w-6 h-6 text-secondary" />
                Calidad del Sueño
              </Label>
              <span className="text-2xl font-bold text-secondary">{sleep}/10</span>
            </div>
            <Slider
              value={[sleep]}
              onValueChange={(v) => setSleep(v[0])}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          {/* Stress */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold flex items-center gap-2">
                <Brain className="w-6 h-6 text-warning" />
                Nivel de Estrés
              </Label>
              <span className="text-2xl font-bold text-warning">{stress}/10</span>
            </div>
            <Slider
              value={[stress]}
              onValueChange={(v) => setStress(v[0])}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">
              1 = Sin estrés, 10 = Muy estresado
            </p>
          </div>

          {/* Exercise */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
            <Label className="text-lg font-semibold flex items-center gap-2">
              <Dumbbell className="w-6 h-6 text-primary" />
              ¿Hiciste ejercicio hoy?
            </Label>
            <Switch
              checked={exercise}
              onCheckedChange={setExercise}
            />
          </div>

          {/* Notes */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">
              Notas Personales (Opcional)
            </Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="¿Algo en particular que quieras recordar sobre hoy?"
              className="min-h-[120px] resize-none"
            />
          </div>

          <Button 
            onClick={handleSubmit} 
            className="w-full text-lg py-6 shadow-glow"
            size="lg"
          >
            Guardar Registro
          </Button>
        </Card>

        {/* Diagnosis Dialog */}
        <Dialog open={showDiagnosis} onOpenChange={setShowDiagnosis}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-2xl">
                <TrendingUp className="w-6 h-6 text-primary" />
                Diagnóstico de Bienestar
              </DialogTitle>
              <DialogDescription>
                Basado en tu registro de hoy
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 mt-4">
              {/* Overall Assessment */}
              <Card className="p-4 bg-gradient-card border-border">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Evaluación General</h3>
                    <p className="text-muted-foreground">{diagnosis.overall}</p>
                  </div>
                </div>
              </Card>

              {/* Individual Metrics */}
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-4 bg-muted/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Smile className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold">Estado de Ánimo</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{diagnosis.mood}</p>
                </Card>

                <Card className="p-4 bg-muted/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Battery className="w-5 h-5 text-accent" />
                    <h4 className="font-semibold">Energía</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{diagnosis.energy}</p>
                </Card>

                <Card className="p-4 bg-muted/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Moon className="w-5 h-5 text-secondary" />
                    <h4 className="font-semibold">Sueño</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{diagnosis.sleep}</p>
                </Card>

                <Card className="p-4 bg-muted/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-5 h-5 text-warning" />
                    <h4 className="font-semibold">Estrés</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{diagnosis.stress}</p>
                </Card>
              </div>

              {/* Recommendations */}
              {diagnosis.recommendations.length > 0 && (
                <Card className="p-4 bg-primary/5 border-primary/20">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-semibold mb-3">Recomendaciones Personalizadas</h4>
                      <ul className="space-y-2">
                        {diagnosis.recommendations.map((rec, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={() => navigate("/dashboard")} 
                  className="flex-1"
                  variant="default"
                >
                  Ver Tendencias
                </Button>
                <Button 
                  onClick={() => navigate("/resources")} 
                  className="flex-1"
                  variant="outline"
                >
                  Explorar Recursos
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default DailyCheck;
