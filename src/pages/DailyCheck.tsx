import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { saveEntry, getEntryByDate } from "@/utils/storage";
import { DailyEntry } from "@/types/wellness";
import { toast } from "sonner";
import { Smile, Frown, Meh, Battery, Moon, Brain, Dumbbell } from "lucide-react";

const DailyCheck = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];
  
  const [mood, setMood] = useState(5);
  const [energy, setEnergy] = useState(5);
  const [sleep, setSleep] = useState(5);
  const [stress, setStress] = useState(5);
  const [exercise, setExercise] = useState(false);
  const [notes, setNotes] = useState("");

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
    toast.success("¡Registro guardado exitosamente!", {
      description: "Tu entrada ha sido guardada. Sigue así."
    });
    
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
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
      </div>
    </Layout>
  );
};

export default DailyCheck;
