import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const ClearDataButton = () => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearData = () => {
    localStorage.removeItem("wellness_entries");
    toast.success("Datos eliminados", {
      description: "Todos los registros anteriores han sido borrados."
    });
    setShowConfirm(false);
    window.location.reload();
  };

  if (showConfirm) {
    return (
      <Card className="p-4 max-w-md mx-auto border-destructive/50 bg-destructive/5">
        <div className="flex items-start gap-3 mb-4">
          <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-destructive mb-1">¿Estás completamente seguro?</h4>
            <p className="text-sm text-muted-foreground">
              Esta acción eliminará permanentemente todos tus registros de bienestar. No podrás recuperar esta información.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowConfirm(false)}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={handleClearData}
            className="flex-1"
          >
            Sí, eliminar todo
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Button 
      variant="destructive" 
      size="sm" 
      className="gap-2"
      onClick={() => setShowConfirm(true)}
    >
      <Trash2 className="w-4 h-4" />
      Limpiar Datos
    </Button>
  );
};

export default ClearDataButton;
